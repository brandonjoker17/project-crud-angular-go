package util

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v4"
)

//GetConnection obtiene la conexion de la db
func GetConnection() *pgx.Conn {
	conn, err := pgx.Connect(context.Background(), "postgresql://postgres:joker@localhost:5432/crud")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	return conn
}
