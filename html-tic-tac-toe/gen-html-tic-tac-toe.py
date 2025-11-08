
# Copyright (c) 2025, Attila M. Magyar
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice,
#    this list of conditions and the following disclaimer.
#
# 2. Redistributions in binary form must reproduce the above copyright notice,
#    this list of conditions and the following disclaimer in the documentation
#    and/or other materials provided with the distribution.
#
# 3. Neither the name of the copyright holder nor the names of its contributors
#    may be used to endorse or promote products derived from this software
#    without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
# ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
# LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
# CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
# SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
# INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
# CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
# ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.

import sys


def main(argv):
    empty_board = " " * 9
    explore(empty_board)

    return 0


def explore(board: str):
    queue = [board]
    explored_boards = set()

    while len(queue) != 0:
        board = queue.pop()

        if board in explored_boards:
            continue

        explored_boards.add(board)
        board_id = board_to_id(board)
        winner = find_winner(board)

        print(f'<b id="{board_id}">', end='')

        if winner is not None or is_full(board):
            for c in board:
                print(f"<a>{c}</a>", end="")

            if winner is not None:
                print(f"<i>{winner} wins!</i>", end="")
            else:
                print(f"<i>Draw!</i>", end="")

            print("</b>")

            continue

        for i in range(9):
            c = board[i]

            if c != " ":
                print(f"<a>{c}</a>", end="")

                continue

            next_move_x = board[:i] + "X" + board[i + 1:]

            if is_full(next_move_x):
                queue.append(next_move_x)

                next_move_x_id = board_to_id(next_move_x)
                print(f'<a href="#{next_move_x_id}"> </a>', end='')

                continue

            next_move_o = find_next_move_o(next_move_x)
            queue.append(next_move_o)

            next_move_o_id = board_to_id(next_move_o)
            print(f'<a href="#{next_move_o_id}"> </a>', end='')

        print("</b>")


def board_to_id(board: str) -> str:
    base_3 = board.replace(" ", "0").replace("O", "1").replace("X", "2")
    n = int(base_3, 3)

    if n == 0:
        return "b0"

    digits = "0123456789abcdefghijklmnopqrstuvwxyz"
    new_base = len(digits)
    board_id = ""

    while n > 0:
        board_id = digits[n % new_base] + board_id
        n //= new_base

    return "b" + board_id


def find_next_move_o(board: str) -> str:
    def minimax(board_state, maximizing):
        winner = find_winner(board_state)

        if winner == "O": return 2
        if winner == "X": return -1
        if is_full(board_state): return 0

        if maximizing:
            best = -float("inf")

            for i in range(9):
                if board_state[i] == " ":
                    new_state = board_state[:i] + "O" + board_state[i + 1:]
                    best = max(best, minimax(new_state, False))

            return best

        else:
            best = float("inf")

            for i in range(9):
                if board_state[i] == " ":
                    new_state = board_state[:i] + "X" + board_state[i + 1:]
                    best = min(best, minimax(new_state, True))

            return best

    best_score = -float("inf")
    best_move = None

    for i in range(9):
        if board[i] == " ":
            new_board = board[:i] + "O" + board[i + 1:]
            score = minimax(new_board, False)

            if score > best_score:
                best_score = score
                best_move = new_board

    return best_move


def is_full(board: str) -> bool:
    return " " not in board


def find_winner(board_state):
    wins = [
        (0, 1, 2), (3, 4, 5), (6, 7, 8),  # rows
        (0, 3, 6), (1, 4, 7), (2, 5, 8),  # cols
        (0, 4, 8), (2, 4, 6),             # diagonals
    ]

    for a, b, c in wins:
        if (
                board_state[a] == board_state[b]
                and board_state[b] == board_state[c]
                and board_state[a] != " "
        ):
            return board_state[a]

    return None


if __name__ == "__main__":
    sys.exit(main(sys.argv))
