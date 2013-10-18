"use strict"

var split = require("split")

module.exports = parseOBJ

function parseOBJ(stream, cb) {
  var v = []
  var vn = []
  var vt = []
  var f = []
  var fn = []
  var ft = []
  stream.pipe(split())
    .on("data", function(line) {
      if(line.length === 0 || line.charAt(0) === "#") {
        return
      }
      var toks = line.split(" ")
      switch(toks[0]) {
        case "v":
          if(toks.length < 3) {
            throw new Error("parse-obj: Invalid vertex :" + line)
          }
          v.push([+toks[1], +toks[2], +toks[3]])
        break

        case "vn":
          if(toks.length < 3) {
            throw new Error("parse-obj: Invalid vertex normal:"+ line)
          }
          vn.push([+toks[1], +toks[2], +toks[3]])
        break

        case "vt":
          if(toks.length < 2) {
            throw new Error("parse-obj: Invalid vertex texture coord:" + line)
          }
          vt.push([+toks[1], +toks[2]])
        break

        case "f":
          var position = new Array(toks.length-1)
          var normal = new Array(toks.length-1)
          var texCoord = new Array(toks.length-1)
          for(var i=1; i<toks.length; ++i) {
            var indices = toks[i].split("/")
            position[i-1] = (indices[0]|0)-1
            texCoord[i-1] = indices[1] ? (indices[1]|0)-1 : -1
            normal[i-1] = indices[2] ? (indices[2]|0)-1 : -1
          }
          f.push(position)
          fn.push(normal)
          ft.push(texCoord)
        break

        case "vp":
        case "s":
        case "o":
        case "g":
        case "usemtl":
        case "mtllib":
          //Ignore this crap
        break

        default:
          throw new Error("parse-obj: Unrecognized directive: '" + toks[0] + "'")
      }
    })
    .on("error", function(err) {
      cb(err, null)
    })
    .on("end", function() {
      cb(null, {
        vertexPositions: v,
        vertexNormals: vn,
        vertexUVs: vt,
        facePositions: f,
        faceNormals: fn,
        faceUVs: ft
      })
    })
}