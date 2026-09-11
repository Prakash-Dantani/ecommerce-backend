CREATE SCHEMA catalog;

CREATE TABLE catalog.categories (
category_id BIGSERIAL PRIMARY KEY,

    parent_category_id BIGINT,

    category_name CHARACTER VARYING(150) NOT NULL,

    slug CHARACTER VARYING(180) NOT NULL UNIQUE,

    description TEXT,

    image_url CHARACTER VARYING,

    sort_order INTEGER DEFAULT 0,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT,

    updated_at TIMESTAMP WITHOUT TIME ZONE,
    updated_by BIGINT,

    deleted_at TIMESTAMP WITHOUT TIME ZONE,
    deleted_by BIGINT,

    CONSTRAINT fk_category_parent
        FOREIGN KEY(parent_category_id)
        REFERENCES catalog.categories(category_id)
        ON DELETE SET NULL

);

CREATE INDEX idx_categories_parent
ON catalog.categories(parent_category_id);

CREATE INDEX idx_categories_slug
ON catalog.categories(slug);

CREATE TABLE catalog.brands (
brand_id BIGSERIAL PRIMARY KEY,

    brand_name CHARACTER VARYING(150) NOT NULL UNIQUE,

    slug CHARACTER VARYING(180) NOT NULL UNIQUE,

    description TEXT,

    logo_url CHARACTER VARYING,

    website CHARACTER VARYING(255),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT,

    updated_at TIMESTAMP WITHOUT TIME ZONE,
    updated_by BIGINT,

    deleted_at TIMESTAMP WITHOUT TIME ZONE,
    deleted_by BIGINT

);

CREATE INDEX idx_brand_slug
ON catalog.brands(slug);
