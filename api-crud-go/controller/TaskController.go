package controller

import (
	"context"
	"encoding/json"
	"github.com/crud-basico/api-crud-go/util"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"strconv"
)

type task struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Hours int `json:"Hours"`
	Completed bool `json:"completed"`
}

//CreateTask nos sirve para crear una tarea
func CreateTask(w http.ResponseWriter, r *http.Request){
	var tarea task
	err := json.NewDecoder(r.Body).Decode(&tarea)
	if err != nil{
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	conn := util.GetConnection()
	defer conn.Close(context.Background())

	_, err = conn.Exec(context.Background(),"insert into tasks(name,hours,completed) values($1,$2,$3)",tarea.Name,tarea.Hours,tarea.Completed)
	if err != nil{
		json.NewEncoder(w).Encode(map[string]string{
			"msg":"no se pudo crear la tarea",
		})
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{
		"msg":"tarea creada",
	})

}

//UpdateTask Nos sirve para actualizar una tarea
func UpdateTask(w http.ResponseWriter, r *http.Request){
	var tarea task
	err := json.NewDecoder(r.Body).Decode(&tarea)
	if err != nil{
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	conn := util.GetConnection()
	defer conn.Close(context.Background())

	_, err = conn.Exec(context.Background(),"update tasks set name=$1,hours=$2,completed=$3 where id=$4",tarea.Name,tarea.Hours,tarea.Completed,tarea.ID)
	if err != nil{
		json.NewEncoder(w).Encode(map[string]string{
			"msg":"no se pudo crear la tarea",
		})
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{
		"msg":"tarea actualizada",
	})
}

//DeleteTask nos sirve para borrar una tarea
func DeleteTask(w http.ResponseWriter, r *http.Request){
	id, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	conn := util.GetConnection()
	defer conn.Close(context.Background())

	_, err = conn.Exec(context.Background(),"DELETE FROM tasks where id=$1",id)
	if err != nil{
		json.NewEncoder(w).Encode(map[string]string{
			"msg":"no se pudo crear la tarea",
		})
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{
		"msg":"tarea borrada",
	})
}

//GetOneTask nos sirve para obtener solo una tarea
func GetOneTask(w http.ResponseWriter, r *http.Request){
	id, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	conn := util.GetConnection()
	defer conn.Close(context.Background())
	var tarea task
	err = conn.QueryRow(context.Background(),"select * from tasks where id=$1",id).Scan(&tarea.ID,&tarea.Name,&tarea.Hours,&tarea.Completed)
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		log.Printf("QueryRow failed: %v\n", err)
	}
	json.NewEncoder(w).Encode(tarea)
}

//GetAllTasks Nos sirve para obtener todas las tareas
func GetAllTasks(w http.ResponseWriter, r *http.Request){
		conn := util.GetConnection()
		defer conn.Close(context.Background())
		var tareas []task
		rows,err := conn.Query(context.Background(),"select * from tasks")
		if err != nil {
			http.Error(w, "Bad Request", http.StatusBadRequest)
			log.Printf("QueryRow failed: %v\n", err)
		}

		for rows.Next() {
			var tarea task
			rows.Scan(&tarea.ID,&tarea.Name,&tarea.Hours,&tarea.Completed)
			tareas = append(tareas,tarea)
		}
		json.NewEncoder(w).Encode(tareas)
}
