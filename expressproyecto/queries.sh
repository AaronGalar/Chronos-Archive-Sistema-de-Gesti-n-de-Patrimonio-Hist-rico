# ==========================================================
# CREDENCIALES DE ACCESO (Para el Navegador)
# Admin: admin@admin.com | Contraseña: 123
# Profe: profe_test@examen.com | Contraseña: 1234
# ========================================================== 
# USERS

curl -X GET http://localhost:3000/api/users
curl -X GET http://localhost:3000/api/users/19
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"email":"test@test.com", "password":"123"}'
curl -X PUT http://localhost:3000/api/users/19 -H "Content-Type: application/json" -d '{"email":"actualizado@test.com"}'

# TEACHERS

curl -X GET http://localhost:3000/api/teachers
curl -X GET http://localhost:3000/api/teachers/1
curl -X POST http://localhost:3000/api/teachers \
     -H "Content-Type: application/json" \
     -d '{"name":"Profesor", "last_name":"Prueba", "user_id": 20}'
curl -X PUT http://localhost:3000/api/teachers/1 -H "Content-Type: application/json" -d '{"name":"Nombre Editado"}'

# STUDENTS

curl -X GET http://localhost:3000/api/students
curl -X GET http://localhost:3000/api/students/1
curl -X POST http://localhost:3000/api/students -H "Content-Type: application/json" -d '{"name":"Alumno Test", "teacher_id": 1}'
curl -X PUT http://localhost:3000/api/students/1 -H "Content-Type: application/json" -d '{"name":"Alumno Editado"}'


#  RESTRICCIONES DE BORRADO 


# Intentar borrar usuario con profesor
curl -X DELETE http://localhost:3000/api/users/19
# Intentar borrar profesor con alumnos
curl -X DELETE http://localhost:3000/api/teachers/1


#  ALUMNOS POR PROFESOR (ORDENADOS Y ACTIVO) 


curl -X GET http://localhost:3000/api/teachers/1/students


# ACTIVACIÓN DE USUARIO 


# POST para activar
curl -X POST http://localhost:3000/api/users/19/active
# GET para comprobar estado
curl -X GET http://localhost:3000/api/users/19/active


#  GENERACIÓN DE TOKEN JWT 


curl -X POST http://localhost:3000/api/token -H "Content-Type: application/json" -d '{"username":"admin@admin.com", "password":"123"}'