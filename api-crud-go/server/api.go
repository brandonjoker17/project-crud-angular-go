package server

import (
	"github.com/crud-basico/api-crud-go/controller"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()
	router.HandleFunc("/tasks", controller.CreateTask).Methods("POST")
	router.HandleFunc("/tasks", controller.GetAllTasks).Methods("GET")
	router.HandleFunc("/tasks", controller.UpdateTask).Methods("PUT")
	router.HandleFunc("/tasks/{id}", controller.GetOneTask).Methods("GET")
	router.HandleFunc("/tasks/{id}", controller.DeleteTask).Methods("DELETE")
	return router
}

