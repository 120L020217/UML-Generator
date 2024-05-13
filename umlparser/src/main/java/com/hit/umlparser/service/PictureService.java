package com.hit.umlparser.service;

import com.hit.umlparser.mapper.PictureMapper;
import com.hit.umlparser.model.Picture;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class PictureService {

    private final PictureMapper mapper;

    public PictureService(PictureMapper mapper) {
        this.mapper = mapper;
    }

    public void savePicture(String text, MultipartFile file, String file_pic) {
        try {
            String jsonData = new String(file.getBytes());
//            String jsonData_pic = new String(file_pic.getBytes());
            Picture picture = new Picture();
            picture.setText(text);
            picture.setJsonData(jsonData);
            picture.setJsonData_pic(file_pic);
            mapper.insert(picture);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Picture> getAllPictures() {
        return mapper.selectList(null);
    }
}