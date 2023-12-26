import csv

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
        # TODO: change
        return True
    
    def manage_rounds(self):
        round = 0
        
        # code for round 1 only 
        print("ROUND 1 ")
        # start word
        print(f"START: {self.rows[1][0]}")
        # end word
        print(f"END: {self.rows[1][1]}")

        round_over = False 
        prev_word = self.rows[1][0]

        # round goes on until end word is reached
        while not round_over:
           
            # user input word
            word = input("Enter next word")
            # validate it
            # 1) word is a valid English word
            # 2) word differs from previous word by 1 letter 
            # 3) word has the same letters as the start word
            valid_word = self.is_word_valid(word, prev_word)
            # get user input word until valid word encountered
            while not valid_word:
                word = input("Please enter a valid word. Your word needs to be a valid English word and needs to differ from the previous word by at most 1 letter ")
                # validate it
                valid_word = self.is_word_valid(word, prev_word)

            # now, word is a valid word in the game
            
            # end word reached 
            if word == self.rows[0][1]:
                # game won!
                print("You have won the game!")
                round_over = True
            
            # update prev_word to current word
            prev_word = word


        
        






        
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
    pass

if __name__=='__main__':
    main()