package api

import "net/http"

func (api *api) ping(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello from ping"))
}