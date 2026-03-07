package com.github.ixanadu13.test;

public class Main {
    public static void main(String[] args){
        System.load("test_project.dll");
        System.out.println(NativeDemo.hello("Java"));
    }

    public static void throwException(){
        throw new RuntimeException("Boom!");
    }
}
