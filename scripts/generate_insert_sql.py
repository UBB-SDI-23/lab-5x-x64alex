from faker import Faker
import random as rand

batches_no = 100 #1000 for last version
inserts_no = 1 #1000 for last version
many_to_many_no = inserts_no*10
fake = Faker(False)

drop_index = open('sql_script.sql',"w")


file = open('sql_script.sql', 'w')
drop_index = open('sql_script.sql',"w")

productNames = ["Lego", "Barbie", "Duplo","Toy Story","Avengers","Animals","Fence","Slide","Backpack"]
categoryNames = ["Toys", "Movies", "Electronics"]
productDescription = [
    "Logic Pro puts a complete recording and MIDI production studio on your Mac, with everything you need to write, record, edit, and mix like never before. And with a huge collection of full-featured plug-ins along with thousands of sounds and loops, youll have everything you need to go from first inspiration to final master, no matter what kind of music you want to create.",
    "A sleek interface matches Final Cut Pro and makes it simple to navigate compression projects. Browse encoding settings in the left sidebar, and open the inspector to quickly configure advanced audio and video properties. Your batch appears in the center, directly below a large viewer that lets you view and navigate your file."
]

file.write('TRUNCATE category, products, clients, transactions;\n')


for i in range(inserts_no):
    print(i)
    file.write('INSERT INTO category(category_id,category_name,category_popularity,category_sales,category_returns_per_month,category_profitability) VALUES ')
    for j in range(batches_no):
        end = ", "
        if j == batches_no - 1:
            end = ";"
        file.write(f'({i * batches_no + j + 1},\'{rand.choice(categoryNames)}_{i * batches_no + j + 1}\',\'{rand.randint(1, 10)}\','+
        f'\'{rand.randint(1, 1000)}\',\'{rand.randint(1, 100)}\',\'{rand.randint(1, 10000)}\')'+ end)
    file.write("\n")

    file.write('INSERT INTO products(product_id,product_name,product_price,product_quantity,product_on_sale,product_weight,product_description,categoryid) VALUES ')
    for j in range(batches_no):
        end = ", "
        if j == batches_no - 1:
            end = ";"
        file.write(f'({i * batches_no + j + 1},\'{rand.choice(productNames)}_{i * batches_no + j + 1}\',\'{rand.randint(1, 100000)}\','+
        f'\'{rand.randint(1, 100000)}\',\'{bool(rand.getrandbits(1))}\',\'{rand.randint(1, 1000)}\',\'{rand.choice(productDescription)}_{i * batches_no + j + 1}\',{rand.randint(1, inserts_no*batches_no)})'+ end)
    file.write("\n")

    file.write('INSERT INTO clients(client_id,client_last_name,client_first_name,client_email,client_address,client_phone_number) VALUES ')   
    for j in range(batches_no):
        fakeName = fake.name()
        names = fakeName.split()
        clientLastName = names[0]
        clientFirstName = names[1]
        end = ", "
        if j == batches_no - 1:
            end = ";"
        file.write(f'({i * batches_no + j + 1},\'{clientFirstName}\',\'{clientLastName}\','+
        f'\'{fake.email(False)}\',\'{fake.address()}\',\'{fake.phone_number()}\')'+ end)
    file.write("\n")


for i in range(many_to_many_no):
    print(i)
    file.write('INSERT INTO transactions(transaction_id,transaction_date,transaction_quantity,client_id,product_id) VALUES ')
    for j in range(batches_no):
        end = ", "
        if j == batches_no - 1:
            end = ";"
        file.write(f'({i * batches_no + j + 1},\'{fake.date_time().strftime("%Y-%m-%d")}\',{rand.randint(1,100)},{rand.randint(1, inserts_no*batches_no)},'+
        f'\'{rand.randint(1, inserts_no*batches_no)}\')'+ end)

file.close()