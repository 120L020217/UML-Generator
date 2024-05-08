package com.hit.umlparser.model;

/**
 * @author: coldcodacode
 * @description:
 * @date: 2024-04-27 21:46
 */
public class Relationship {
    private String from;
    private String to;
    private String type;

    public Relationship(String from, String to, String type) {
        this.from = from;
        this.to = to;
        this.type = type;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "{" +
                "from='" + from + '\'' +
                ", to='" + to + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
