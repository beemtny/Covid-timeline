package main

import (
	"covid-timeline/router"
)

func main() {
	r, err := router.SetupRouter()
	if err != nil {
		panic(err)
	}

	r.Run()
}
