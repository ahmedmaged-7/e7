var express =require('express');
var app =express(); // This responds with "Hello World" on the homepage 
const fs=require('fs');
const bp = require('body-parser');



/*
Course entity will have the following properties:

        name: string, required, min length of 5 characters
        code: string, required, must match 3 letters followed by 3 numbers.
        id: integer, auto generated.
        description: string, optional, max length of 200 characters.

Student entity will have the following properties:

        name: string, required, only letters in both cases, apostrophe and dashes are allowed.
        code: string, required, must match 7 characters.
        id: integer, auto generated.

The endpoints for your API should look like /api/courses/.. and /api/students/..
The endpoints for your forms should look like /web/courses/create and /web/students/create


*/

function del_course(id){
fs.readFile(__dirname +"/"+"course.json",'utf8',function(err,data){ 
data =JSON.parse(data );
delete data["course"+(id)]; 
console.log(data ); 
fs.writeFile(__dirname +"/"+"course.json",JSON.stringify( data), function (err) {
  if (err) throw err;
  console.log('Saved!');
return data;
}); 
})}


function add_course(name,code,describtion){
fs.readFile(__dirname +"/"+"course.json",'utf8',function(err,data){ 
data =JSON.parse(data );
var highest = data[ Object.keys(data).sort().pop() ];
console.log(highest);
var id = parseInt(highest.id);
console.log(id);
var course = { "Course_name":name, "Course_code":code,"describtion":describtion, "id":++id }  
data["course"+(id)]=course; 
data=(JSON.stringify(data) );
fs.writeFile(__dirname +"/"+"course.json",( data), function (err) {
  if (err) throw err;
  console.log('Saved!');
return data;
}); 
}
)
}

function show_all(){
var data=fs.readFileSync(__dirname +"/"+"course.json",'utf8');
 return data;

}


function show(id){

fs.readFile(__dirname +"/"+"course.json",'utf8',function(err,data){ 
var courses =JSON.parse(data); 

return courses["course"+id]; 

})}

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post('/addCourse',function(req,res){ 
// First read existing users. 
console.log(req.body.cname)
console.log(req.body.cid)

var a=add_course(req.body.cname,req.body.cid,req.body.describtion);
res.sendFile(__dirname +"/"+"main.htm");
 })







app.post('/delete_course',function(req,res){ // First read existing users. 
var data=del_course(req.body.id);
res.send(data); 
}
)
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))




app.get('/course_form',function(req,res){ res.sendFile(__dirname +"/"+"form.htm"); }) 
app.get('/courses',function(req,res){ 
var data =show_all();
console.log(data);
//console.log(JSON.stringify(data)); 
res.send((data));
 }

)
app.get('/',function(req,res){ res.sendFile(__dirname +"/"+"main.htm"); }) 
app.post('/id',function(req,res){ // First read existing users. 
var data=JSON.parse(show_all());
res.send(JSON.stringify(data["course"+req.body.id]));
  
}
)

/////////////////////////////////////////////////////////////////////////////////////////////student codes


function del_student(id){
fs.readFile(__dirname +"/"+"student.json",'utf8',function(err,data){ 
data =JSON.parse(data );
delete data["student"+(id)]; 
console.log(data ); 
fs.writeFile(__dirname +"/"+"student.json",JSON.stringify( data), function (err) {
  if (err) throw err;
  console.log('Saved!');
return data;
}); 
})}


function add_student(name,code){
fs.readFile(__dirname +"/"+"student.json",'utf8',function(err,data){ 
data =JSON.parse(data );
console.log(data);
if (data==undefined || data=={}){
var student = { "student_name":name, "student_code":code, "id":1}  
data["student"+(id)]=student; 
}
else{

var highest = data[ Object.keys(data).sort().pop() ];
console.log(highest);
var id = parseInt(highest.id);
console.log(id);
var student = { "student_name":name, "student_code":code, "id":++id }  
data["student"+(id)]=student; 
}
data=(JSON.stringify(data) );
fs.writeFile(__dirname +"/"+"student.json",( data), function (err) {
  if (err) throw err;

return data;
}); 
}
)
}

function Student_show_all(){
var data=fs.readFileSync(__dirname +"/"+"student.json",'utf8');
 return data;

}


function show(id){

fs.readFile(__dirname +"/"+"student.json",'utf8',function(err,data){ 
var courses =JSON.parse(data); 

return courses["student"+id]; 

})}

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post('/add_student',function(req,res){ 
var a=add_student(req.body.sname,req.body.sid);
res.sendFile(__dirname +"/"+"main.htm");
 })

app.post('/delete_student',function(req,res){ // First read existing users. 
console.log("delete students"); 
var data=del_student(req.body.id);
res.send(data); 
}
)

app.get('/studentform',function(req,res){ 
console.log("students"); 

res.sendFile(__dirname +"/"+"student.htm"); }) 

app.get('/students',function(req,res){ 
console.log("students"); 
var data =Student_show_all();
console.log(data);

res.send((data));
 }

)

app.post('/student/id',function(req,res){ // First read existing users.
console.log("student id") ;
var data=JSON.parse(Student_show_all());
res.send(JSON.stringify(data["student"+req.body.id]));
  
}
)



const PORT=process.env.PORT ||3000;
const host="0.0.0.0";

app.listen(PORT,host,()=>console.log("Example app listening at http://%s:%s",host,PORT) );

