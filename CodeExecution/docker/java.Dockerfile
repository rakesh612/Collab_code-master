FROM openjdk:17
WORKDIR /app
COPY templates/Main.java Main.java
COPY templates/input.txt input.txt
RUN javac Main.java
CMD ["sh", "-c", "java Main < input.txt"]
