
### Scanner

```java
import  java.util.Scanner;

Scanner scanner = new Scanner(System.in);
int num = scanner.nextInt();
String sentence = scanner.nextLine();
```

--------

### Array

```java
import java.util.Arrays;
int[] copyArray = Arrays.copyOf(array, array.length);
```
--------

### List and ArrayList

```java
import java.util.ArrayList;

private int[] myNumbers = new int[50];

private ArrayList<String> groceryList = new ArrayList<String>();
groceryList.add("item 1");
groceryList.add("item 2");
groceryList.size();
groceryList.get(position);
groceryList.set(position, item);
groceryList.remove(position);
groceryList.contains(searchItem);

// if position >= 0 ---> item in the list, otherwise -1 not found
int position = groceryList.indexOf(searchItem);

// copy ArrayList
ArrayList<String> newArray = new ArrayList<String>();
newArray.addAll(groceryList);
// OR
ArrayList<String> newArray = new ArrayList<String>(groceryList);

//  ArrayList to Array
String[] myArray = new String[groceryList.size()];
myArray = groceryList.toArray(myArray);
```

-----

### Autoboxing and Unboxing

```java
class IntClass {
  private int myValue;

  public IntClass(int myValue) { this.myValue = myValue; }

  public int getMyValue() { return myValue; }

  public void setMyValue(int myValue) { return this.myValue; }
}

String strArray = new String[10];
int[] intArray = new int[10];

ArrayList<String> strArrayList = new ArrayList<String>();
strArrayList.add("Thai");

ArrayList<IntClass> intClassArrayList = new ArrayList<InClass>();
intClassArrayList.add(new IntClass(54));

// Long way
Integer integer = new Integer(54);
ArrayList<Integer> intArrayList = new ArrayList<Integer>();
for(int i = 0; i <= 10; i++) {
  intArrayList.add(Integer.valueOf(i));
}

for(int i = 0; i <= 10; i++) {
  System.out.println(i + " --> " + intArrayList.get(i).intValue());
}

Double doubleValue = new Double(12.54);
ArrayList<Double> myDoubleValues = new ArrayList<Double>();
for(double dlb = 0.0; dbl <= 10.0; dbl += 0.5) {
  myDoubleValues.add(Double.valueOf(dbl));
}

for(int i = 0; i < myDoubleValues.size(); i++) {
  double value = myDoubleValues.get(i).doubleValue();
  System.out.println(i + " --> " + value);
}

// Short way
Integer myIntValue = 56; // Integer.valueOf(56);
int myInt = myIntValue; // myInt.intValue();

```
------

#### LinkedList

```java
import java.util.Iterator;
import java.util.LinkedList;
import java.util.ListIterator;

LinkedList<String> placesToVisit = new LinkedList<String>();
placesToVisit.add("Sydney");
placesToVisit.add("Melbourne");
placesToVisit.add("Brisbane");
placesToVisit.add("Perth");
placesToVisit.add("Canberra");
placesToVisit.add("Adelaide");
placesToVisit.add("Darwin");


Interator<String> i = linkedList.iterator();
while(i.hasNext()) {
  System.out.println("Now visiting " + i.next());
}

private static boolean addInOrder(LinkedList<String> linkedList, String newCity) {
  ListIterator<String> stringListIterator = linkedList.listIterator();

  while(stringListIterator.hasNext()) {
    int comparison = stringLIstIterator.next.compareto(newCity);
    if (comparison == 0) {
      // equal, do not add
      System.out.println(newCity + "is already included as a destination");
      return false;
    } else if(comparison > 0) {
      // new City should appear before this one
      // Brisbane -> Adelaide
      stringListIterator.previous();
      stringListIterator.add(newCity); 
    } else {
      // move on next city
    }
  }
  
  stringListIterator.add(newCity);
  return true;
}

private static void visit(LinkedList cities) {
  Scanner scanner = new Scanner(System.in);
  boolean quit = false;
  boolean goingForward = true;
  ListIterator<String> listIterator = cities.listIterator();

  if(cities.isEmpty()) {
    System.out.println("No cities in the itenerary");
    return;
  } else {
    System.out.println("Now visiting " + listIterator.next());
    printMenu();
  }

  while(!quit) {
    int action = scanner.nextInt();
    scanner.nextLine();
    switch(action) {
      case 0:
        System.out.println("Holiday (Vacation over)");
        quit = true;
        break;
      case 1:
        if (!goingForward) {
          if(listIterator.hasNext()) {
            listIterator.next();
          }
          goingForward = true;
        }

        if (listIterator.hasNext()) {
          System.out.println("Now visiting " + listIterator.next());
        } else {
          System.out.println("Reach the end of the list");
          goingForward = false;
        }
        break;
      case 2:
        if (goingForward) {
          if(listIterator.hasPrevious()) {
            listIterator.previous();
          }
          goingForward = false;
        }

        if (listIterator.hasPrevious()) {
          System.out.println("Now visiting " + listIterator.previous());
        } else {
          System.out.println("We are at the start of the list");
          goingForward = true;
        }
        break;
      case 3:
        printMenu();
        break;
    }
  }
}

```

-------

#### Interfaces

```java
public interface ITelephone {
  void powerOn();
  void dial(int phoneNumber);
  void answer();
  boolean callPhone(int phoneNumber);
  boolean isRinging();
}


public class DeskPhone implements ITelephone {
  private int myNumber;
  private boolean isRinging;

  public DeskPhone(int myNumber) {
    this.myNumber = myNumber;
  }

  @Override
  public void powerOn() {
    System.out.println("No action taken, desk phone does not have a power button");
  }

  @Override
  public void dial(int phoneNumber) {
    System.out.println("Now ringing " + phoneNumber + " on deskphone");
  }

  @Override
  public void answer() {
    if (isRinging) {
      System.out.println("Answering the desk phone");
      isRinging = false;
    }
  }

  @Override
  public boolean callPhone(int phoneNumber) {
    if (phoneNumber == myNumber) {
      isRinging = true;
      System.out.println("Ring ring");
    } else {
      isRinging = false;
    }
  }

  @Override
  public boolean isRinging() {
    return isRinging;
  }
}

public class MobilePhone implements ITelephone {
  private int myNumber;
  private boolean isRinging;
  private boolean isOn = false;


  public DeskPhone(int myNumber) {
    this.myNumber = myNumber;
  }

  @Override
  public void powerOn() {
    isOne = true;
    System.out.println("Mobile phone pwered up");
  }

  @Override
  public void dial(int phoneNumber) {
    if (isOne) {
      System.out.println("Now ringing " + phoneNumber + " on deskphone");
    } else {
      System.out.println("Phone is switched off");
    }
  }

  @Override
  public void answer() {
    if (isRinging) {
      System.out.println("Answering the mobile phone");
      isRinging = false;
    }
  }

  @Override
  public boolean callPhone(int phoneNumber) {
    if (phoneNumber == myNumber && isOn) {
      isRinging = true;
      System.out.println("Melody ring");
    } else {
      isRinging = false;
      System.out.println("Mobile phone not on or number idfferent");
    }

    return isRinging;
  }

  @Override
  public boolean isRinging() {
    return isRinging;
  }
}


public static void main(String[] args) {
  ITelephone thaiPhone; // interface

  // Deskphone
  thaiPhone = new DeskPhone(123456);
  thaiPhone.powerOn();
  thaiPhone.callPhone(123456);
  thaiPhone.answer();

  // MobilePhone
  thaiPhone = new MobilePhone(23456);
  thaiPhone.powerOn();
  thaiPhone.callPhone(23456);
  thaiPhone.answer();
}
```


----------


#### Inner Classes

```java
  private ArrayList<Gear> gears;
  private int maxGears;
  private int gearNumber = 0;

  public Gearbox(int maxGears) {
    this.maxGears = maxGears;
    this.gears = new ArrayList<>();
    Gear neutral = new Gear(0, 0.0);
    this.gears.add(neutral);
  }

  public void operateClutch(boolean in) {
    this.clutchIsIn = in;
  }

  public void addGear(int number, double ratio) {
    if ((number > 0) && (number <= maxGears)) {
      this.gears.add(new Gear(number, ratio));
    }
  }

  public void changeGear(int newGear) {
    if ((newGear >= 0) && (newGear < this.gears.size()) && this.clutchIsIn) {
      this.currentGear = newGear;
      System.out.println("Gear " + newGear + " selected.");
    } else {
      System.out.println("Grind!");
      this.currentGear = 0;
    }
  }

  public double wheelSpeed(int revs) {
    if (clutchIsIn) {
      System.out.println("Scream!!!");
      return 0.0;
    }
    
    return revs * gears.get(currentGear).getRatio();
  }

  private class Gear {
    private int gearNumber;
    private double ratio;

    public Gear(int gearNumber, double ratio) {
      this.gearNumber = gearNumber;
      this.ratio = ratio;
    }

    public double driveSpeed(int revs) {
      return revs * (this.ratio);
    }

    public double getRatio() {
      return ratio;
    }
  }

  public static void main(String[] args) {
    Gearbox mcLearen = new Gearbox(6);
    // Gearbox.Gear first = mcLaren.new Gear(1, 12.3);
    // Gearbox.Gear second = mcLaren.new Gear(2, 15.4);
    // System.out.println(first.driveSpeed(1000));

    mcLaren.addGeart(1, 5.3);
    mcLaren.addGeart(2, 10.6);
    mcLaren.addGeart(1, 15.9);
    mcLaren.operateClutch(true);
    mcLaren.changeGear(1);
    mcLaren.operateClutch(false);
    System.out.println(mcLaren.wheelSpeed(1000));
    mcLaren.changeGear(2);
    System.out.println(mcLaren.wheelSpeed(3000));
  }
```

```java
public class Button {
  private String title;
  private OnClickListener onClickLister;

  public Button(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }

  public void setOnClickListener(OnClickListerner onClickListener) {
    this.onClickLister = onClickListener;
  }

  public void onClick() {
    this.onClickLister.onClick(this.title);
  }

  public interface OnClickListener {
    public void onClick(String title);
  }

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    Button btnPrint = new Button("Print");

    class ClickListerner implements Button.OnClickListener {
      public ClickListener() {
        System.out.println("I've been attached");
      }

      @Override
      public void onClick(String title) {
        System.out.println(title + " was clicked");
      }
    }

    btnPrint.setOnClickListener(new ClickListener());
  }

  private static void listen() {
    booleann quit = false;
    while(!quit) {
      int choice = scanner.nextInt();
      scanner.nextLine();
      switch(choice) {
        case 0:
          quit = true;
          break;
        case 1:
          btnPrint.onClick();
      }
    }
  }
}
```

--------

#### Abstract Classes

```java
public abstract class Animal {
  private String name;

  public Animal(String name) {
    this.name = name;
  }

  public abstract void eat();
  public abstract void breathe();

  public String getName() {
    return name;
  }
}

public class Dog extends Animal {
  
  public Dog(String name) {
    super(name);
  }

  @Override
  public void eat() {
    System.out.println(getName() + " is eating");
  }

  @Override
  public void breathe() {
    System.out.println("Breathe in, breathe out, repeat");
  }
}

public static void main(String[] args) {
  Dog dog = new Dog("Yorkie");
  dob.breathe();
  dog.eat();
}

```

```java
public abstract class Bird extends Animal {
  public Bird(String name) {
    super(name);
  }
  
  @Override
  public void eat() {
    System.out.println(getName() + " is pecking");
  }

  @Override
  public void breathe() {
    System.out.println("Breathe in, breathe out, repeat");
  }

  public abstract void fly();
}

public class Parrot extends Bird {

  public Parrot(String name) {
    super(name);
  }

  @Override
  public void fly() {
    System.out.println("Flitting from branch to branch");
  }
}

public static void main(String[] args) {
  // ERROR: cannot instantiate an abstract class
  // Bird bird = new Bird("A Bird");

  Parrot parrot = new Parrot("Australian ringneck");
  parrot.breathe();
  parrot.eat();
  parrot.fly();
}
```

```java
public class Penguin extends Bird {

  public Penguin(String name) {
    super(name);
  }

  @Override
  public void fly() {
    System.out.println("I'm not very good at that, can I go for a swim instead?");
  }
}
```

-------

#### Abstract Classes and Interfaces
- **Abstract classes** are similar to Interfaces. You cannot instantiate them, and they may contain a mix of methods declared with or without an implemenation.
- However, with Abstract classes, you can declare fields that are not static and final, and define public, protected, and private concerte methods.
- An Abstract class can extend only one parent class but it can implement multiple interfaces.
- When an Abstract class is subclassed, the subclass usually provides implementations for all of the abstract methods in its parent class.
- However, if it doesnot, then the subclass must also be declared abstract.

##### Use an Abstract class when ...
- You want to share code among several closely related classes (Animal - with fields name, age...)
- You expect classes that extend your bastract class to have many common methods or feilds or required access modifiers other than public (protected, private).
- You want to declare non static or non final fields (for example name, age), this enables you to define methods that can access and modify the state of an object (getName, setName).
- When you have a requirement for your base class to provide a default implementation of certain methods but other methods should be open to being overridden by child classes.
- **Summary**: The purpose of an Abstract class is to provide a common definition of a base class that multiple derived classes can share.


##### Interface
- An intreface is just the declaration of methods of an Class, it's not the implementation.
- In an Interface, we define what kind of operation an object can perform. These operations are defined by the classes that implement the Interface.
- **Interfaces form a contract between the class and the outside world, and this contract is enforced at build time by the compiler.**
- You cannot instantiate them, and they may contain a mix of methods declared with or without an implementation. All methods in interfaces are automatically public and abstract.
- Interfaces are more flexible and can deal with a lot more stress on the design of your program than the implementation.
- By introducing interfaces into your program, you are really introduce points of variation at which you can plug in different implementations for that interface. An Interfaces primary purpose is abstraction, decoupling the "What" from the "how".
- **NOTE**: Since Java 8 interfaces can contain default methods. In other words methods with implentation. The keyword default is used (mostly for backwards compatibility), and static methods as well before Java 8 that was not possible.
- **NOTE**: Since Java 9 an Interface can also contain private methods (commonly used when two default methods in an Interface share common code).

##### Use an Interface when ...
- You expect that unrelated classes will implement your interface. For example, the interfaces Comparable and Cloneable are implemented by many unrelated classes.
- You want specify the behavior of a particular data type, but you are not concerned about who implements its behavior.
- You want to separate different behavior.
- The Collection API is an excellent example, we have the List interface and implementations ArrayList and LinkedList
- The JDBC API is another excellent example. It exist of almost only interfaces. The concrete implementations are provided as "JDBC drivers". This enables you to write all the JDBC code independent of the database (DB) vendor.

```java
public interface CanFly() {
  void fly();
}

public abstract class Bird extends Animal implements CanFly {
  public Bird(String name) {
    super(name);
  }

  @Override
  public void eat() {
    System.out.println(getName() + " is peacking");
  }

  @Override
  public void breathe() {
    System.out.println("Breathe in, breathe out, repeat");
  }

  @Override
  public void fly() {
    System.out.println(getName() + " is flapping its wings");
  }
}

public class Parrot extends Bird {

  public Parrot(String name) {
    super(name);
  }
}

public class Penguin extends Bird {

  public Penguin(String name) {
    super(name);
  }

  @Override
  public void fly() {
    super.fly();
    System.out.println("I'm not very good at that, can I go for a swim instead?");
  }
}
```

-------

#### Generics

```java
public abstract class Player {
  private String name;

  public Player(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}

public class BaseballPlayer extends Player {

  public BaseballPlayer(String name) {
    super(name);
  }
}

public class FootballPlayer extends Player {

  public FootballPlayer(String name) {
    super(name);
  }
}

public class SoccerPlayer extends Player {

  public SoccerPlayer(String name) {
    super(name);
  }
}

// class first, and then interfaces
// Player is a class, Coach and Manager are interfaces
// public class Team<T extends Player & Coach & Manager> {
public class Team<T extends Player> implements Comparable<Team<T>> {
  private String name;
  int played = 0;
  int won = 0;
  int lost = 0;
  int tied = 0;

  private ArrayList<T> members = new ArrayList<>();

  public Team(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public boolean addPlayer(T player) {
    if (members.contains(player)) {
      // System.out.println(((Player) player).getName() + " is already on this team");
      System.out.println(player.getName() + " is already on this team");
      return false;
    } else {
      members.add(player);
      // System.out.println(((Player) player).getName() + " picked for team " + this.name);
      System.out.println(player.getName() + " picked for team " + this.name);
      return true;
    }
  }

  public int numPlayers() {
    return this.members.size();
  }

  public void matchResult(Team<T> opponent, int ourSocre, int theirSocre) {
    String mesage;

    if (ourScore > theirScore) {
      won++;
      message = " beat ";
    } else if(ourScore == theirScore) {
      tied++;
      message = " drew with ";
    } else {
      lost++;
      message = " lose to ";
    }

    played++;
    if (opponent != null) {
      System.out.println(this.getName() + message + opponent.getName());
      opponent.matchResult(null, theirScore, ourScore);
    }
  }

  public int ranking() {
    return (won * 2) + tied;
  }

  @Override
  public int compareTo(Team<T> team) {
    if (this.ranking() > team.ranking()) {
      return -1;
    } else if (this.ranking() < team.ranking()) {
      return 1;
    } else {
      return 0;
    }
  }
}

public static void main(String[] args) {
  FootballPlayer joe = new FootballPlayer("Joe");
  BaseballPlayer pat = new BaseballPlayer("Pat");
  SoccerPlayer beckham = new SoccerPlayer("Beckham");

  Team<FootballPlayer> adelaideCrows = new Team<>("Adelaide Crows");
  adelaideCrows.addPlayer(joe);
  // adelaideCrows.addPlayer(pat);
  // adelaideCrows.addPlayer(beckham);

  System.out.println(adelaideCrows.numPlayers());

  Team<BaseballPlayer> baseballTeam = new Team<>("Chicago Cubs");
  adelaideCrows.addPlayer(pat);

  // Team<String> brokenTeam = new Team<>("This won't work");
  // brokenTeam.addPlayer("no-one");

  Team<FootballPlayer> melbourne = new Team<>("Melbourne");
  FootballPlayer banks = new FootballPlayer("Gordon");
  melbourne.addPlayer(banks);

  Team<FootballPlayer> hawthorn = new Team<>("Hawthorn");
  Team<FootballPlayer> fremantle = new Team<>("Fremantle");

  hawthorn.matchResult(fremantle, 1, 0);
  hawthorn.matchResult(adelaideCrows, 3, 8);

  adelaideCrows.matchResult(fremantle, 2, 1);
  
  
  System.out.println("Rankings");
  System.out.println(adelaideCrows.getName() + ": " + adelaideCrows.ranking());
  System.out.println(melbourne.getName() + ": " + melbourne.ranking());
  System.out.println(hawthorn.getName() + ": " + hawthorn.ranking());
  System.out.println(fremantle.getName() + ": " + fremantle.ranking());

  System.out.println(adelaideCrows.compareTo(melbourne));
  System.out.println(adelaideCrows.compareTo(hawthorn));
  System.out.println(hawthorn.compareTo(adelaideCrows));
  System.out.println(melbourne.compareTo(fremantle));

  ArrayList<Team> teams;
  Collections.sort(teams); // using compareTo method to sort

}
```

--------

#### Java Naming Convensions
- The things you will name in Java are:
  - Packages
  - Classes
  - Interfaces
  - Methods
  - Constants
  - Variables
  - Type Parameters

##### Packages
- Always lower case.
- Package names should be unique
- Use your internet domain name, reversed, as a prefix for the package name.

##### Invalid domain name components
- replace invalid characters (i.e.-) in domain name with an underscore
- Domain name components starting with a number should instead start with an underscore_
- Domain name components that are Java keywords should have that component start with an underscore.
- Example:
  - Switch.supplier.com ---> com.supplier._switch
  - 1world.com ---> com._1world
  - Experts-exchange.com ---> com.experts_exchange

##### Example package names
- java.lang
- java.io
- org.xml.sax.helpers
- com.thai.autoboxing

##### Class names
- CamelCase
- Class names should be nouns (they represent things).
- Should start with a capital letter
- Each word in the name should also start with a capital (e.g. LinkedList)
- Example:
  - ArrayList
  - LinkedList
  - String
  - TopSong
  - GearBox
  - Main

##### Interface names
- Capitalized like class names (CamelCase).
- Consider what objects implementing the interface will become of what they will be able to do
- Exmples:
  - List
  - Comparable
  - Serializeable

##### Method names
- mixedCase.
- Often verbs.
- Reflect the function performed or the reslt returned.
  - Examples:
    - size()
    - getName()
    - addPlayer()

##### Constats
- ALL UPPER_CASE
- Separate words with underscore _.
- Dexlared using the final keyword.
- Examples:
  - Static final int MAX_INT
  - Static final short SEVERITY_ERROR
  - Static final double P1 = 3.141592653

##### Variable names
- mixedCase
- Meaningful and indicative.
- Start with lower case letter.
- Do not use underscores _.
- Examples:
  - i
  - league
  - sydneySwans
  - boxLength

##### Type Parameters
- Single Character, capital letters.
- Examples:
  - E - Element (used extensively by the Java Collections Framework)
  - K - Key
  - T - Type
  - V - Value
  - S, U, V, etc. - 2nd, 3rd, 4th types

--------

### Access Modifiers
- Top Level:
  - Only classes, interfaces and enums can exist at the top level, everything else must be included within one of these.
  - **public**: the object is visible to all classes everywhere, whether they are in the same package or have imported the package containing the public class.
  - **Package-private**: the object is only avialable within its own package (and is visible to every class within the same package). Package-private is specified by not specifying, i.e it is the default if you do not specify public. There is not a "package-private" keyword.

- Member level:
  - **public**: at the member level, public has the same meaning as at top level. A public lass member (or field) and public method can be accessed from any other class anywhere, even in a different package.
  - **Package-private**: this also has the same meaning as it does at the top level. An object with no access modifier is visible to every class within the same package (but not to classes in exteernal packages).
  - **private**: the object is only visible within the class it is declared. It is not visible anywhere else (including in subclasses of its class).
  - **Protected**: the object is visible anywhere in its own package (like package-private) but also in subclasses even if they are in another package.
