FROM gcc:12
WORKDIR /app
COPY . .
CMD g++ main.cpp -o main && ./main < input.txt