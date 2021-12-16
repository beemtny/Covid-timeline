package router

import (
	"covid-timeline/models"
	"net/http"

	"log"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CustomerHandler struct {
	DB *gorm.DB
}

func SetupRouter() (r *gin.Engine, err error) {
	log.Printf("start setup router\n")
	r = gin.Default()

	h := CustomerHandler{}
	h.DB, err = models.Initialize()
	if err != nil {
		return nil, err
	}

	r.Use(CORSMiddleware())

	log.Printf("finish connect and migrate db\n")
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.POST("/insertEntry", h.InsertEntry)
	r.GET("/queryTimeline", h.QueryTimeline)
	r.POST("/deleteEntry", h.DeleteEntry)

	return r, nil

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")

		if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
		
		c.Next()
	}
}
