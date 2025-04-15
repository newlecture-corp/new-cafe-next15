DROP VIEW IF EXISTS public.menu_view;

CREATE VIEW menu_view AS
SELECT 
    menu.*, 
    category.is_public AS category_is_public
FROM 
    menu
LEFT JOIN 
    category ON menu.category_id = category.id;
