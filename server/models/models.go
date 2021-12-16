package models

type LOCATION_TYPE string

const (
	INDOOR     LOCATION_TYPE = "INDOOR"
	OUTDOOR    LOCATION_TYPE = "OUTDOOR"
	HOME       LOCATION_TYPE = "HOME"
	TRAVELLING LOCATION_TYPE = "TRAVELLING"
)

type BasicInfo struct {
	ID         int64  `gorm:"primaryKey;autoIncrement"`
	Gender     string `gorm:"type:varchar(255)"`
	Age        int8   `gorm:"type:int"`
	Occupation string `gorm:"type:varchar(255)"`

	Timeline []Timeline `gorm:"foreignKey:UserID"`
}

func (BasicInfo) TableName() string {
	return "basic_info"
}

type Timeline struct {
	ID           int64  `gorm:"primaryKey;autoIncrement"`
	UserID       int64  `gorm:"type:int"`
	TimeFrom     int64  `gorm:"type:int"`
	TimeTo       int64  `gorm:"type:int"`
	Detail       string `gorm:"type:varchar(255)"`
	LocationType string `gorm:"type:varchar(255)"`
	Location     string `gorm:"type:varchar(255)"`
}

func (Timeline) TableName() string {
	return "timeline"
}
