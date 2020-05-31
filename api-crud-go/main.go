package main

import (
	"github.com/crud-basico/api-crud-go/server"
	"log"
	"net/http"
)

func main() {
	router := server.Router()
	log.Fatal(http.ListenAndServe(":1234",router))
}
