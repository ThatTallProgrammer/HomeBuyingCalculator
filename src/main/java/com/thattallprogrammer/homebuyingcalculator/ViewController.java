package com.thattallprogrammer.homebuyingcalculator;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class ViewController
{
  private static final PropertyImporter PROPERTY_IMPORTER = new PropertyImporter();

  @GetMapping("/")
  public ModelAndView index()
  {
    Map<String, Object> model = new HashMap<>();
    return new ModelAndView("calculator", model);
  }

  @GetMapping("/information/{topic}")
  public ModelAndView infoPopup(@PathVariable String topic)
  {
    Map<String, Object> model = new HashMap<>();
    model.put("title", PROPERTY_IMPORTER.getProperty("popup.properties", topic + "-title"));
    model.put("description", PROPERTY_IMPORTER.getProperty("popup.properties", topic + "-description"));
    return new ModelAndView("popup", model);
  }
}
