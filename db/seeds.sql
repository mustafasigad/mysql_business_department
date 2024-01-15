INSERT INTO department (name)
VALUES ("Electronics"),
       ("Finance"),
       ("Human Rescource"),
       ("Production");
INSERT INTO role (title, salary,dept_id)
VALUES
  ("Electronic Engineer", 120000,4),
  ("Accountant", 100000,3),
  ("Recruiter", 80000,2),
  ("Factory Worker", 50000,4); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("John", "Doe", 1, NULL), 
  ("Jane", "Smith", 2, NULL),
  ("Peter", "Gibbons", 3, NULL),
  ("Bob", "Rob", 4, NULL);