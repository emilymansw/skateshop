package com.skateshop.backend.service.impl;

import com.cloudinary.Transformation;
import com.skateshop.backend.config.CloudinaryConfig;
import com.skateshop.backend.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cloudinary.transformation.Layer;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {
    @Autowired
    private CloudinaryConfig cloudinaryConfig;

    @Override
    public String createURL(String gripeTape, String deck, String truckColor, String wheelColor)
    {
        String truck = "fury-skateboard-forged-baseplate-truck-size-8quoteslash2032-mm-removebg-preview_pexl3b";
        String wheel = "52-mm-99a-conical-skateboard-wheels-4-pack-ivory-removebg-preview_ynhnov";
        String truckColorReplace;
        String wheelColorReplace;
        if ( truckColor.equals("silver")){
            truckColorReplace = null;
        } else {
            truckColorReplace = "replace_color:" + truckColor + ":40";
        }
        if ( wheelColor.equals("white")){
            wheelColorReplace = null;
        } else {
            wheelColorReplace = "replace_color:" + wheelColor + ":90";
        }
        return cloudinaryConfig.createCloudinary().url().transformation(new Transformation()
                .background("#ffffff").flags("layer_apply").height(1300)
                .overlay(new Layer().publicId(gripeTape)).zoom(0).crop("mfit")
                .chain().flags("cutter", "layer_apply").height(1300)
                .overlay(new Layer().publicId(deck)).x(0).zoom(0).crop("scale")
                .chain().height(1300).overlay(new Layer().publicId(deck)).x(516).crop("scale")
                .chain().effect(truckColorReplace).overlay(new Layer().publicId(truck)).width(450).x(260).y(-320).crop("scale")
                        .chain().angle(180).effect(truckColorReplace).overlay(new Layer().publicId(truck)).width(450).x(260).y(320).crop("scale")
                        .chain().effect(wheelColorReplace).height(150).overlay(new Layer().publicId(wheel)).x(85).y(320).crop("scale")
                                .chain().effect(wheelColorReplace).height(150).overlay(new Layer().publicId(wheel)).x(437).y(320).crop("scale")
                                .chain().effect(wheelColorReplace).height(150).overlay(new Layer().publicId(wheel)).x(85).y(-320).crop("scale")
                                .chain().effect(wheelColorReplace).height(150).overlay(new Layer().publicId(wheel)).x(437).y(-320).crop("scale")).generate("sample.jpg");


    }
}

