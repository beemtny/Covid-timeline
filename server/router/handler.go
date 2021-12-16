package router

import (
	"covid-timeline/models"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type InsertDataRequest struct {
	Gender       string `json:"gender"`
	Age          int8   `json:"age"`
	Occupation   string `json:"occupation"`
	TimeFrom     int64  `json:"timeFrom"`
	TimeTo       int64  `json:"timeTo"`
	Detail       string `json:"detail"`
	LocationType string `json:"locationType"`
	Location     string `json:"locationName"`
}

func (h *CustomerHandler) InsertEntry(c *gin.Context) {
	reqData := InsertDataRequest{}

	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	json.Unmarshal(jsonData, &reqData)
	log.Printf("insert data:%+v into table", reqData)

	tx := h.DB.Begin()
	defer tx.Commit()

	basicInfoReq := &models.BasicInfo{
		Gender:     reqData.Gender,
		Age:        reqData.Age,
		Occupation: reqData.Occupation,
	}

	timelineReq := &models.Timeline{
		TimeFrom:     reqData.TimeFrom,
		TimeTo:       reqData.TimeTo,
		Detail:       reqData.Detail,
		LocationType: reqData.LocationType,
		Location:     reqData.Location,
	}

	basicInfo := []models.BasicInfo{}
	if err := tx.Where("gender = ? AND age = ? AND occupation = ?", reqData.Gender, reqData.Age, reqData.Occupation).Find(&basicInfo); err.Error != nil {
		tx.Rollback()
		c.Status(http.StatusBadRequest)
		return
	}

	log.Printf("basicInfo is:%+v", basicInfo)

	// TODO check if time collapsed -> return error
	if len(basicInfo) > 0 {
		timelineReq.UserID = basicInfo[0].ID
		timelineCollaps := []models.Timeline{}
		if err := tx.Where(`user_id = ? AND (
			(? > time_from AND ? < time_to) OR 
			(? > time_from AND ? < time_to) OR
			(? < time_from AND ? > time_to)
			)`,
			timelineReq.UserID, timelineReq.TimeFrom, timelineReq.TimeFrom, timelineReq.TimeTo, timelineReq.TimeTo, timelineReq.TimeTo, timelineReq.TimeTo).
			Find(&timelineCollaps); err.Error != nil {

			tx.Rollback()
			c.Status(http.StatusBadRequest)
			return
		}

		if len(timelineCollaps) > 0 {
			tx.Rollback()
			c.Status(http.StatusBadRequest)
			return
		}

	} else {
		log.Printf("start create basicInfo...")
		if result := tx.Create(basicInfoReq); result.Error != nil {
			tx.Rollback()
			c.Status(http.StatusBadRequest)
			return
		}
		log.Printf("basicInfo is:%+v", basicInfoReq)
		timelineReq.UserID = basicInfoReq.ID
	}

	if result := tx.Create(timelineReq); result.Error != nil {
		tx.Rollback()
		c.Status(http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": "success",
		"data":    map[string]string{},
	})
}

func (h *CustomerHandler) QueryTimeline(c *gin.Context) {
	response := []models.BasicInfo{}

	if result := h.DB.Preload("Timeline", func(db *gorm.DB) *gorm.DB {
		return db.Order("timeline.time_from ASC")
	}).Find(&response); result.Error != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	log.Printf("result is:%+v\n", response)

	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": "success",
		"data":    response,
	})
}

type DeleteDataRequest struct {
	ID int8 `json:"id"`
}

func (h *CustomerHandler) DeleteEntry(c *gin.Context) {
	reqData := DeleteDataRequest{}

	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	json.Unmarshal(jsonData, &reqData)
	log.Printf("delete timelineEntry id:%v", reqData.ID)

	if result := h.DB.Where("id = ?", reqData.ID).Delete(models.Timeline{}); result.Error != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": "success",
		"data":    map[string]string{},
	})
}
