CREATE TABLE public.design_documents (
    id integer NOT NULL,
    share_code character varying(12) NOT NULL,
    document_type character varying(20) DEFAULT 'certificate'::character varying NOT NULL,
    document_name character varying(255) DEFAULT 'Untitled Design'::character varying NOT NULL,
    design_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    thumbnail_data text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE SEQUENCE public.design_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.design_documents_id_seq OWNED BY public.design_documents.id;
ALTER TABLE ONLY public.design_documents ALTER COLUMN id SET DEFAULT nextval('public.design_documents_id_seq'::regclass);
ALTER TABLE ONLY public.design_documents
    ADD CONSTRAINT design_documents_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.design_documents
    ADD CONSTRAINT design_documents_share_code_key UNIQUE (share_code);
CREATE INDEX idx_design_documents_document_type ON public.design_documents USING btree (document_type);
CREATE INDEX idx_design_documents_share_code ON public.design_documents USING btree (share_code);
CREATE INDEX idx_design_documents_updated_at ON public.design_documents USING btree (updated_at);
