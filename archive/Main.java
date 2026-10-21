class Smartphone{
    String brand;
    String model;
    String color;
    int storage;
    double price;

    void displayInfo(){
        System.out.println("Brand:" + brand);
        System.out.println("Model:" + model);
        System.out.println("Color" + color);
        System.out.println("Storage:" + storage + "GB");
        System.out.println("Price:" + price + "php");
    }
    void turnOn(){
        System.out.println("The smartphone is now turned on");
    }
    void makeCall(String contactName){
        System.out.println("Calling:" + contactName + "...");
    }
}

public class Main{
    public static void main(String[]args){

        Smartphone phone1 = new Smartphone();
        phone1.brand = "Samsung";
        phone1.model = "Galaxy S25";
        phone1.color = "Black";
        phone1.storage = 256;
        phone1.price = 25000;

        Smartphone phone2 = new Smartphone();
        phone2.brand = "Infinix";
        phone2.model = "NOTE 30 VIP";
        phone2.color = "White";
        phone2.storage = 256;
        phone2.price = 30000;

        Smartphone phone3 = new Smartphone();
        phone3.brand = "Redmagic";
        phone3.model = "Redmagic 10";
        phone3.color = "Black and yellow";
        phone3.storage = 256;
        phone3.price = 45000;

        phone1.displayInfo();
        phone1.turnOn();
        phone1.makeCall("JM");

        System.out.println();

        phone2.displayInfo();
        phone2.turnOn();
        phone2.makeCall("Shane");

        System.out.println();

        phone3.displayInfo();
        phone3.turnOn();
        phone3.makeCall("Romelyn");

        System.out.println();

    }
}