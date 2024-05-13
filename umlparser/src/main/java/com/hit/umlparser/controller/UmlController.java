package com.hit.umlparser.controller;

import com.hit.umlparser.model.Relationship;
import com.hit.umlparser.model.UmlObject;
import com.hit.umlparser.parser.PlantUmlParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: coldcodacode
 * @description:
 * @date: 2024-03-05 13:55
 */
@RestController
public class UmlController {
    @CrossOrigin
    @PostMapping("/api/parse-uml")
    public ResponseEntity<Object> parseUml(@RequestBody Map<String, String> payload) {
        String umlCode = payload.get("uml");
        System.out.println(umlCode);
        // 解析逻辑，返回解析后的结果
        try {
            // 解析逻辑，返回解析后的结果
            Map<String, Object> result = parseLogic(umlCode);
            System.out.println(result);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            // 返回错误报文
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    private Map<String, Object> parseLogic(String umlCode) throws Exception {
        PlantUmlParser parser = new PlantUmlParser();
        List<UmlObject> objects = parser.parseObjects(umlCode);
        List<Relationship> relationships = parser.parseRelationships(umlCode, objects);

        if (objects.isEmpty() && relationships.isEmpty()) {
            throw new Exception("Both objects and relationships are empty");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("objects", objects);
        result.put("relationships", relationships);

        return result;
    }
}