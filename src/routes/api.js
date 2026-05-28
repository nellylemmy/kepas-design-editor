import { Router } from 'express';
import { createDesign, getDesign, updateDesign, deleteDesign } from '../controllers/designController.js';

const router = Router();

router.post('/', createDesign);
router.get('/:shareCode', getDesign);
router.put('/:shareCode', updateDesign);
router.post('/:shareCode', updateDesign);  // sendBeacon (POST-only)
router.delete('/:shareCode', deleteDesign);

export default router;
