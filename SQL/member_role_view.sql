DROP VIEW IF EXISTS public.member_role_view;

CREATE VIEW member_role_view AS
SELECT 
    member_role.*,
    role.name AS role_name,
    member.username AS username
FROM 
    member_role
LEFT JOIN
    role ON member_role.role_id = role.id
LEFT JOIN
    member on member_role.member_id = member.id;