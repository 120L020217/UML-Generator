package com.hit.umlparser.model;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

@TableName("objectdiagrams")
public class Picture {
    @TableId("picId")
    private String text;

    @TableField("picData")
    private String jsonData;

    @TableField("pic")
    private String pic;

    public String getJsonData_pic() {
        return pic;
    }

    public void setJsonData_pic(String jsonData_pic) {
        this.pic = jsonData_pic;
    }
// getters and setters

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getJsonData() {
        return jsonData;
    }

    public void setJsonData(String jsonData) {
        this.jsonData = jsonData;
    }
}