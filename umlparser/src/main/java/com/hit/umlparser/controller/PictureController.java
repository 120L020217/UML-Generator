package com.hit.umlparser.controller;

import com.hit.umlparser.model.Picture;
import com.hit.umlparser.service.PictureService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class PictureController {

    private final PictureService service;

    public PictureController(PictureService service) {
        this.service = service;
    }

    @PostMapping("/api/set-history")
    public void handleFileUpload(@RequestParam("text") String text, @RequestParam("file") MultipartFile file, @RequestParam("file_pic") String file_pic) {
        service.savePicture(text, file, file_pic);
    }

    @GetMapping("/api/get-history")
    public List<Picture> getAllPictures() {
        return service.getAllPictures();
    }
}