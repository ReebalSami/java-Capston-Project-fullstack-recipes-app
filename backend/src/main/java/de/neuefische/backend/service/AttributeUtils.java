package de.neuefische.backend.service;

import java.util.Map;

public class AttributeUtils {

    private AttributeUtils() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }

    public static String getStringAttribute(Map<String, Object> attributes, String key) {
        if (!attributes.containsKey(key)) {
            throw new IllegalArgumentException("Missing attribute: " + key);
        }
        Object value = attributes.get(key);

        if (value instanceof Integer n){
            return convertFromIntToString(n);
        }
        if (!(value instanceof String)) {
            throw new IllegalArgumentException("Expected a String for attribute: " + key);
        }
        if (((String) value).isEmpty()) {
            throw new IllegalArgumentException("Invalid attribute value: name");
        }
        return (String) value;
    }

    private static String convertFromIntToString(int n){
        return String.valueOf(n);
    }
}
