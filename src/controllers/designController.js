import pool from '../config/database.js';
import crypto from 'crypto';

function generateShareCode() {
  return crypto.randomBytes(9).toString('base64url').slice(0, 12);
}

// @desc    Create a new design document
// @route   POST /api/designs
export const createDesign = async (req, res) => {
  const { designData, documentType, documentName, thumbnailData } = req.body;

  if (!designData || typeof designData !== 'object') {
    return res.status(400).json({ error: 'designData (object) is required.' });
  }

  const validTypes = ['certificate', 'receipt', 'invoice', 'custom'];
  const type = validTypes.includes(documentType) ? documentType : 'custom';
  const name = (typeof documentName === 'string' && documentName.trim())
    ? documentName.trim().slice(0, 255)
    : 'Untitled Design';

  try {
    let shareCode = generateShareCode();
    let attempts = 0;

    while (attempts < 5) {
      try {
        const result = await pool.query(
          `INSERT INTO design_documents (share_code, document_type, document_name, design_data, thumbnail_data)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING share_code, id, created_at`,
          [shareCode, type, name, JSON.stringify(designData), thumbnailData || null]
        );
        return res.status(201).json({
          shareCode: result.rows[0].share_code,
          id: result.rows[0].id,
          createdAt: result.rows[0].created_at
        });
      } catch (err) {
        if (err.code === '23505' && err.constraint === 'design_documents_share_code_key') {
          shareCode = generateShareCode();
          attempts++;
        } else {
          throw err;
        }
      }
    }

    return res.status(500).json({ error: 'Could not generate a unique share code.' });
  } catch (err) {
    console.error('createDesign error:', err.message);
    return res.status(500).json({ error: 'Failed to create design.' });
  }
};

// @desc    Get a design by share code
// @route   GET /api/designs/:shareCode
export const getDesign = async (req, res) => {
  const { shareCode } = req.params;

  if (!shareCode || shareCode.length > 12) {
    return res.status(400).json({ error: 'Invalid share code.' });
  }

  try {
    const result = await pool.query(
      `SELECT design_data, document_type, document_name, thumbnail_data, created_at, updated_at
       FROM design_documents
       WHERE share_code = $1`,
      [shareCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Design not found.' });
    }

    const row = result.rows[0];
    return res.json({
      designData: row.design_data,
      documentType: row.document_type,
      documentName: row.document_name,
      thumbnailData: row.thumbnail_data,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  } catch (err) {
    console.error('getDesign error:', err.message);
    return res.status(500).json({ error: 'Failed to load design.' });
  }
};

// @desc    Update an existing design
// @route   PUT /api/designs/:shareCode
export const updateDesign = async (req, res) => {
  const { shareCode } = req.params;
  const { designData, documentName, thumbnailData } = req.body;

  if (!shareCode || shareCode.length > 12) {
    return res.status(400).json({ error: 'Invalid share code.' });
  }

  if (!designData || typeof designData !== 'object') {
    return res.status(400).json({ error: 'designData (object) is required.' });
  }

  try {
    const sets = ['design_data = $1', 'updated_at = NOW()'];
    const params = [JSON.stringify(designData)];
    let idx = 2;

    if (typeof documentName === 'string' && documentName.trim()) {
      sets.push(`document_name = $${idx}`);
      params.push(documentName.trim().slice(0, 255));
      idx++;
    }

    if (thumbnailData !== undefined) {
      sets.push(`thumbnail_data = $${idx}`);
      params.push(thumbnailData || null);
      idx++;
    }

    params.push(shareCode);
    const result = await pool.query(
      `UPDATE design_documents SET ${sets.join(', ')} WHERE share_code = $${idx} RETURNING updated_at`,
      params
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Design not found.' });
    }

    return res.json({ updatedAt: result.rows[0].updated_at });
  } catch (err) {
    console.error('updateDesign error:', err.message);
    return res.status(500).json({ error: 'Failed to update design.' });
  }
};

// @desc    Delete a design
// @route   DELETE /api/designs/:shareCode
export const deleteDesign = async (req, res) => {
  const { shareCode } = req.params;

  if (!shareCode || shareCode.length > 12) {
    return res.status(400).json({ error: 'Invalid share code.' });
  }

  try {
    const result = await pool.query(
      `DELETE FROM design_documents WHERE share_code = $1`,
      [shareCode]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Design not found.' });
    }

    return res.sendStatus(204);
  } catch (err) {
    console.error('deleteDesign error:', err.message);
    return res.status(500).json({ error: 'Failed to delete design.' });
  }
};
