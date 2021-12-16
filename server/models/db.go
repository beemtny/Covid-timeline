package models

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	host     string = "postgres"
	port     string = "5432"
	username string = "postgres"
	password string = "postgres"
	dbname   string = "covid-timeline"
)

func Initialize() (*gorm.DB, error) {
	log.Printf("start initalize database\n")

	constr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, username, password, dbname)
	db, err := gorm.Open(postgres.Open(constr), &gorm.Config{})
	if err != nil {
		log.Fatalf("cannot connect db at port:5432 cuz:%+v\n", err)
		return nil, err
	}

	log.Printf("connect db at port:5432\n")

	hasBasicInfoTable := db.Migrator().HasTable(&BasicInfo{})
	if !hasBasicInfoTable {
		log.Printf("Doesn't has entry table, start migrate entry table...")
		err = db.AutoMigrate(&BasicInfo{})
		if err != nil {
			log.Fatalf("cannot migrate table entry")
			return nil, err
		}
	}

	hasTimelineTable := db.Migrator().HasTable(&Timeline{})
	if !hasTimelineTable {
		log.Printf("Doesn't has timeline table, start migrate timeline table...")
		err = db.AutoMigrate(&Timeline{})
		if err != nil {
			log.Fatalf("cannot migrate table timeline")
			return nil, err
		}
	}

	return db, err
}
