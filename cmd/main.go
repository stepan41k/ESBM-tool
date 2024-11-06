package main

import (
	"log"
	"github.com/gorilla/mux"
	"github.com/stepan41k/dockerTest/pkg/api"

)

func main() {
	api := api.New(mux.NewRouter(), nil)
	api.Handle()
	log.Fatal(api.ListenAndServe("localhost:8090"))

}