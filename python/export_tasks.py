import csv
import os
from pathlib import Path

from dotenv import load_dotenv
import psycopg2


def load_config():
    load_dotenv()

    database_url = os.getenv("DATABASE_URL", "").strip()
    export_csv_path = os.getenv("EXPORT_CSV_PATH", "tasks_export.csv").strip()

    if not database_url:
        raise ValueError("DATABASE_URL is not set. Check your .env file.")

    if not export_csv_path:
        raise ValueError("EXPORT_CSV_PATH is empty. Check your .env file.")

    return database_url, Path(export_csv_path)


def fetch_tasks(database_url):
    query = """
        SELECT id, title, description, status, created_at
        FROM tasks
        ORDER BY created_at DESC, id DESC
    """

    with psycopg2.connect(database_url) as connection:
        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()

    return rows


def write_csv(file_path, rows):
    file_path.parent.mkdir(parents=True, exist_ok=True)

    with file_path.open("w", newline="", encoding="utf-8") as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["id", "title", "description", "status", "created_at"])
        writer.writerows(rows)


def main():
    database_url, export_csv_path = load_config()
    tasks = fetch_tasks(database_url)
    write_csv(export_csv_path, tasks)
    print(f"Exported {len(tasks)} tasks to '{export_csv_path}'.")


if __name__ == "__main__":
    main()
