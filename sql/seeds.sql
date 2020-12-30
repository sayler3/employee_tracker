INSERT INTO department (name)
VALUES ('Legal'), ('UX'), ('Development'), ('Marketing'), ('OPS');

INSERT INTO role (title, salary, department_id)
VALUES ('Director', 150000, 1), ('Advisor', 145000, 2), 
('UX Manager', 165000, 2), ('Senior Dev', 150000, 3),
('Dev', 120000, 3), ('Senior Sales', 110000, 4), ('Sales', 95000, 4),
('HR', 98000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Harry', 'Potter', 4, null), ('Ron', 'Weasley', 5, 1), 
('Hermione', 'Granger', 1, null), ('Lord', 'Voldemont', 5, 1),
('Luna', 'Lovegood', 8, null), ('Albus', 'Dumbledore', 6, null),
('Pansy', 'Parkinson', 3, null), ('Sirus', 'Black', 2, 7),
('Neville', 'Longbottom', 7, 6);