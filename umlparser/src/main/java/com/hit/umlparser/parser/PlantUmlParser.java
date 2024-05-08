package com.hit.umlparser.parser;

/**
 * @author: coldcodacode
 * @description:
 * @date: 2024-04-27 21:47
 */
import com.hit.umlparser.model.Relationship;
import com.hit.umlparser.model.UmlObject;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PlantUmlParser {

    public List<UmlObject> parseObjects(String plantUmlSource) {
        List<UmlObject> objects = new ArrayList<>();
        String[] lines = plantUmlSource.split("\\n");

        Pattern pattern = Pattern.compile("^object\\s+(\\w+)\\s*:\\s*(\\w+)");

        for (String line : lines) {
            Matcher matcher = pattern.matcher(line.trim());
            if (matcher.find()) {
                // Generate a unique ID and take the first 8 characters
                String id = UUID.randomUUID().toString().substring(0, 8);
                // Extract and add object names
                objects.add(new UmlObject(id, matcher.group(1), matcher.group(2)));
            }
        }

        return objects;
    }

    public List<Relationship> parseRelationships(String plantUmlSource, List<UmlObject> objects) throws Exception {
        List<Relationship> relationships = new ArrayList<>();
        String[] lines = plantUmlSource.split("\\n");

        Pattern pattern = Pattern.compile("^(\\w+)\\s+(<\\|--|\\*--|o--)\\s+(\\w+)");

        for (String line : lines) {
            Matcher matcher = pattern.matcher(line.trim());
            if (matcher.find()) {
                String fromId = findObjectIdByName(objects, matcher.group(1));
                String toId = findObjectIdByName(objects, matcher.group(3));

                if (fromId == null || toId == null) {
                    throw new Exception("Unable to find object with name: " + matcher.group(1));
                }

                String type;
                switch (matcher.group(2)) {
                    case "<|--":
                        type = "triangle";
                        break;
                    case "*--":
                        type = "diamondSolid";
                        break;
                    case "o--":
                        type = "diamond";
                        break;
                    default:
                        type = "line";
                }
                relationships.add(new Relationship(fromId, toId, type));
            }
        }

        return relationships;
    }

    private String findObjectIdByName(List<UmlObject> objects, String name) {
        for (UmlObject object : objects) {
            if (object.getName().equals(name)) {
                return object.getId();
            }
        }
        return null;
    }

    public static void main(String[] args) throws Exception {
        String uml = "@startuml\n" +
                "object firstObject:FirstClass {\n" +
                "  Name = \"Object1\"\n" +
                "}\n" +
                "object secondObject:SecondClass {\n" +
                "  Name = \"Object2\"\n" +
                "}\n" +
                "firstObject <|-- secondObject : extends\n" +
                "@enduml";

        PlantUmlParser parser = new PlantUmlParser();
        List<UmlObject> objects = parser.parseObjects(uml);
        List<Relationship> relationships = parser.parseRelationships(uml, objects);

        System.out.println("Objects:");
        for (UmlObject obj : objects) {
            System.out.println(obj.getId());
        }

        System.out.println("\nRelationships:");
        for (Relationship rel : relationships) {
            System.out.println(rel.getFrom() + " " + rel.getType() + " " + rel.getTo());
        }
    }
}