const QUERY = {
    SELECT_ESTATES_PREVIEW: `
        SELECT
            estate.*,
            (SELECT estate_images.image_url
             FROM estate_images estate_images
             WHERE estate_images.estate_id = estate.id
             LIMIT 1) AS preview_image
        FROM estates estate
        ORDER BY estate.created_at DESC
        LIMIT 10
    `,


    SELECT_ESTATE: `
        SELECT
            estate.*,
            estate_images.image_url
        FROM estates estate
        LEFT JOIN estate_images estate_images
        ON estate.id = estate_images.estate_id
        WHERE estate.id = ?
    `,


    CREATE_ESTATE: `
        INSERT INTO estates(
            title, price, description, address, city, type, size, bedrooms, bathrooms, author_id, contact_name, contact_email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,


    CREATE_IMAGES: `
        INSERT INTO estate_images(
            estate_id, image_url
        ) VALUES (?, ?)
    `,


    UPDATE_ESTATE: `
        UPDATE estates
        SET
            title = ?,
            price = ?,
            description = ?,
            address = ?,
            city = ?,
            type = ?,
            size = ?,
            bedrooms = ?,
            bathrooms = ?,
            contact_name = ?,
            contact_email = ?
        WHERE id = ?
    `,


    UPDATE_ESTATE_IMAGE: `
        UPDATE estate_images
        SET image_url = ?
        WHERE id = ?
    `,


    DELETE_ESTATE: `
        DELETE FROM estates
        WHERE id = ?
    `,


    DELETE_ESTATE_IMAGE: `
        DELETE FROM estate_images
        WHERE id = ?
    `,
};


export default QUERY;