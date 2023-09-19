
public class Equipment
{

    public class Chest
    {
      
        int FlatArmour;
        int increaseArmour;


        public Chest(int FlatArmour, int increaseArmour)
        {

            this.FlatArmour = FlatArmour;
            this.increaseArmour = increaseArmour;
        }
        public int IncreaseArmour()
        {
            return FlatArmour * increaseArmour / 100;
        }
    }
}
public class Heroes
{

    public class Druid
    {
        int spellDamage;
        int lvl;
        int armour;
        int evasion;
        int life;
        string StyleOfPlay = "Средний бой";
        public Druid(int spellDamage, int lvl, int armour, int evasion, int life)
        {
            this.spellDamage = spellDamage;
            this.lvl = lvl;
            this.armour = armour;
            this.evasion = evasion;
            this.life = life;
        }

        public int Damage()
        {
            return spellDamage * lvl;
        }
        public int ArmorDefence()
        {
            return armour + lvl * 2;
        }

        public string Att()
        {
            return StyleOfPlay;
        }
    }
    public class Archer
    {
        int spellDamage;
        int lvl;
        int evasion;

        string StyleOfPlay = "Дальний бой";

        public Archer(int spellDamage, int lvl, int evasion)
        {
            this.spellDamage = spellDamage;
            this.lvl = lvl;
            this.evasion = evasion;

        }
        public int Damage()
        {
            return spellDamage * lvl;
        }
        public int Defence()
        {
            return evasion = lvl * 2;
        }
        public string Att()
        {
            return StyleOfPlay;
        }
    }
}


public class MainClass
{

    public static void Main()
    {


        string SelectPromt(string message)
        {
            System.Console.Write(message);
            return Console.ReadLine();
        }
        string selectName = SelectPromt("Выберите персонажа <druid , archer , druid-archer> : ");
        string equipment = SelectPromt("Будет ли у персонажа какие-либо доспехи?");
        string select = selectName;

        if (select == "druid")
        {

            if (equipment == "yes")
            {


                Random rnd = new Random();
                int flatArmours = rnd.Next(20, 50);

                Console.Write("Вы выбрали " + select + ",");
                int Promt(string message)
                {
                    System.Console.Write(message);
                    return Convert.ToInt32(System.Console.ReadLine());
                }
                string TextPromt(string message)
                {
                    System.Console.Write(message);
                    return Convert.ToString(System.Console.ReadLine());
                }

                string name = TextPromt("Введите ник персонажа : ");
                int levelAttribute = Promt("Введите уровень персонажа: ");


                int level = levelAttribute;

                Equipment.Chest armour = new Equipment.Chest(flatArmours, 5);
                int increasedArmour = armour.IncreaseArmour();
                Heroes.Druid Hero = new Heroes.Druid(2, level, 5 + increasedArmour + flatArmours, 6, 10);
                Console.WriteLine("Никнейм : " + name);
                Console.WriteLine("Урон : " + Hero.Damage());
                Console.WriteLine("Персонаж : " + select);
                Console.WriteLine("Броня: " + Hero.ArmorDefence());
                Console.WriteLine("Стиль боя: " + Hero.Att());
            }
            else
            {


                Console.Write("Вы выбрали " + select + ",");
                int Promt(string message)
                {
                    System.Console.Write(message);
                    return Convert.ToInt32(System.Console.ReadLine());
                }
                string TextPromt(string message)
                {
                    System.Console.Write(message);
                    return Convert.ToString(System.Console.ReadLine());
                }

                string name = TextPromt("Введите ник персонажа  : ");
                int levelAttribute = Promt("Введите уровень персонажа: ");


                int level = levelAttribute;

                Heroes.Druid Hero = new Heroes.Druid(2, level, 5, 6, 10);
                Console.WriteLine("Никнейм : " + name);
                Console.WriteLine("Урон : " + Hero.Damage());
                Console.WriteLine("Персонаж : " + select);
                Console.WriteLine("Броня: " + Hero.ArmorDefence());
                Console.WriteLine("Стиль боя: " + Hero.Att());
            }

        }
        if (select == "archer")
        {
            Console.Write("Вы выбрали " + select + ",");
            int Promt(string message)
            {
                System.Console.Write(message);
                return Convert.ToInt32(System.Console.ReadLine());
            }
            string TextPromt(string message)
            {
                System.Console.Write(message);
                return Convert.ToString(System.Console.ReadLine());
            }

            string name = TextPromt("Введите ник персонажа  : ");
            int levelAttribute = Promt("Введите уровень персонажа: ");


            int level = levelAttribute;

            Heroes.Archer Hero = new Heroes.Archer(10, level, 100);
            Console.WriteLine("Никнейм : " + name);
            Console.WriteLine("Урон : " + Hero.Damage());
            Console.WriteLine("Уклонение : " + Hero.Defence());
            Console.WriteLine("Персонаж : " + select);
            Console.WriteLine("Стиль боя: " + Hero.Att());
        }
        if (select == "druid-archer")
        {
            Console.Write("Вы выбрали " + select + ",");
            int Promt(string message)
            {
                System.Console.Write(message);
                return Convert.ToInt32(System.Console.ReadLine());
            }
            string TextPromt(string message)
            {
                System.Console.Write(message);
                return Convert.ToString(System.Console.ReadLine());
            }

            string name = TextPromt("Введите ник персонажа  : ");
            int levelAttribute = Promt("Введите уровень персонажа: ");


            int level = levelAttribute;

            Heroes.Archer Hero = new Heroes.Archer(10, level, 100);
            Heroes.Druid Hero1 = new Heroes.Druid(2, level, 5, 6, 10);
            Console.WriteLine("Никнейм : " + name);
            Console.WriteLine("Урон : " + Hero1.Damage());
            Console.WriteLine("Уклонение : " + Hero.Defence());
            Console.WriteLine("Персонаж : " + select);
            Console.WriteLine("Броня: " + Hero1.ArmorDefence());
        }
    }


}


