parse-obj
=========
A simple parser for .OBJ mesh files.

## Example

```javascript
var fs = require("fs")
var parseOBJ = require("parse-obj")

parseOBJ(fs.createReadStream("mesh.obj"), function(err, result) {
  if(err) {
    throw new Error("Error parsing OBJ file: " + err)
  }
  console.log("Got mesh: ", result)
})
```

### `require("parse-obj")(stream, cb(err, result))`
Parses a read stream into a .OBJ format mesh

* `stream` is a read stream
* `cb` is a callback that gets executed once the stream is parsed.  The `result` object is a structure with the following data:

  + `vertexPositions` an array of vertex position data
  + `vertexNormals` an array of vertex normal data
  + `vertexUVs` an array of vertex UV coordinates
  + `facePositions` an array of indices for face positions
  + `faceNormals` an array of indices for face normals
  + `faceUVs` an array of indices for face texture coordinates


## Credits
(c) 2013 Mikola Lysenko. MIT License
