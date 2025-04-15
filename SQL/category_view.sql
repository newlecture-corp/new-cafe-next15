DROP VIEW IF EXISTS public.category_view;

CREATE VIEW public.category_view AS
SELECT
    c.id,
    c.name,
    c.created_at,
    c.is_public,
    c."order",
    COUNT(m.id) AS menu_count
FROM
    category c
LEFT JOIN
    menu m ON c.id = m.category_id
GROUP BY
    c.id, c.name, c.created_at, c.is_public, c."order";
