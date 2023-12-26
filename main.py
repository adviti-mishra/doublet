import csv
import enchant as ec

class Game:

    def __init__(self, name):
        # initialize user's name
        self.name = name 
        # initialize start_end words
        self.process_csv()

    def process_csv(self):
        file = open('start_end.csv')
        csvreader = csv.reader(file)
        self.rows = []
        for row in csvreader:
            self.rows.append(row)
    
    def is_word_valid(self, word, prev_word):

        flag = True

        # preprocess words

        # remove blank spaces and convert to upper case
        word = word.strip().upper()
        prev_word = prev_word.strip().upper()

        # 1. lengths have to be the same 
        if len(word) != len(prev_word):
            print("Please ensure your word is of the same length as the start word")
            flag = False
        
        # 2. Word has to be a valid English word
        dict = ec.Dict("en_US")
        if not dict.check(word):
            print("Please ensure your word is a valid English word")
            flag = False
        
        # 3. words have to differ by at most one letter

        # convert words to lists of characters
        word = list(word)
        prev_word = list(prev_word)

        differ = 0
        for char_word, char_prev_word in zip(word,prev_word):
            if char_word != char_prev_word:
                # already differs somewhere
                if differ == 1:
                    print("Please ensure your word differs from the previous one by at most 1 letter")
                    flag = False
                    break
                else:
                    differ += 1
        
        return flag
    
    def manage_rounds(self):
        
        self.print_rules()

        round = 1
        while round < 40:
            print("\n")
            status = self.manage_round(round)
            # round has been quit
            if status == 1:
                print(f"Game ended after {round} rounds")
                break
            round += 1
    
    def print_rules(self):
        print("Welcome to doublet")
        print("You need to get from the start word to the end word through creating a sequence of valid words. Here are some rules you need to follow")
        print("1. Each intermediate word can be formed from the previous word by changing at most 1 character ")
        print("2. Each intermediate word must be a valid word")
        print("3. All words need to be the same length as the start word and the end word")
        print("Happy doubletting!")



    def manage_round(self, round):
        start_word = self.rows[round][0]
        end_word = self.rows[round][1]

        # code for round 1 only 
        print(f"ROUND {round}")
        # start word
        print(f"START: {start_word}")
        # end word
        print(f"END: {end_word}")

        round_over = False 
        prev_word = start_word

        count = 0

        # round goes on until end word is reached
        while not round_over:
           
            # user input word
            word = input("Enter next word: ")

            # check if end signal
            if word == "Q":
                round_over = True 
                return 1
            
            if word == "R":
                self.print_rules()
                continue

            # validate it
            # 1) word is a valid English word
            # 2) word differs from previous word by 1 letter 
            # 3) word has the same number of letters as the start word
            valid_word = self.is_word_valid(word, prev_word)
            # get user input word until valid word encountered
            while not valid_word:
                #print("Please enter a valid word. Your word needs to be a valid English word of the same length as the start word and needs to differ from the previous word by at most 1 letter ")
                word = input("Enter next word: ")
                # check if end signal
                if word == "Q":
                    round_over = True 
                    return 1
                # check is rules refresher wanted
                if word == "R":
                    self.print_rules()
                    continue

                # validate it
                valid_word = self.is_word_valid(word, prev_word)

            # now, word is a valid word in the game
            
            count += 1

            word = word.strip().upper()

            # end word reached 
            if word == end_word:
                # game won!
                print(f"\nYou have won the round in {count} steps!")
                round_over = True
            
            # update prev_word to current word
            prev_word = word
        
        return 0
        
    name = "user"
    rows = []
    



def main():
    # loop through csv file 
    # print start and end word
    # while not end_game
    # for each word
    # check if word is valid and if differs from previous word by only 1 letter
    # if the word is now the end word, set end_game to true
    # if the word is q, set end_game to true
    # print number of intermediate words and game status
    obj = Game("Adviti")
    obj.manage_rounds()

if __name__=='__main__':
    main()