# API

## InsertEntry

***URL***: `/insertEntry`

***Method***: `POST`

### Body Parameters

```json
{
  "gender": "string",
  "age": "int",
  "occupation": "string",
  "timeFrom": "int",
  "timeTo": "int",
  "detail": "string",
  "locationType": "string",
  "location": "string"
}
```

### Success Response

**Code** : `200`

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```
---

## QueryTimeline

***URL***: `/queryTimeline`

***Method***: `GET`

### Success Response

**Code** : `200`

```json
{
  "code": 0,
  "message": "success",
  "data": {
      "gender": "string",
      "age": "int",
      "occupation": "string",
      "timeline" : [
          {
              "entryId": "int",
              "timeFrom": "int",
              "timeTo": "int",
              "detail": "string",
              "locationType": "string",
              "location": "string"
          },{},{},...
      ]
  }
}
```
---

## DeleteEntry

***URL***: `/deleteEntry`

***Method***: `POST`

### Body Parameters

```json
{
  "entryId": "int"
}
```
### Success Response

**Code** : `200`

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```