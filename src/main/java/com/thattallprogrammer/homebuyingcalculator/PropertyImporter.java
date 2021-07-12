package com.thattallprogrammer.homebuyingcalculator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertyImporter
{
  private static final Logger log = LoggerFactory.getLogger(PropertyImporter.class);

  public String getProperty(String propertyFileName, String key)
  {
    Properties properties = null;

    try {
      properties = getPropertiesResource(propertyFileName);
    } catch (IOException e) {
      log.error(e.getMessage());
    }

    return properties == null ? "" : properties.getProperty(key);
  }

  private Properties getPropertiesResource(String propertyFileName) throws IOException
  {
    ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
    InputStream inputStream = classLoader.getResourceAsStream(propertyFileName);
    if (inputStream == null) {
      log.error("Could not load " + propertyFileName);
      return null;
    }
    Properties properties = new Properties();
    properties.load(inputStream);
    return properties;
  }
}
