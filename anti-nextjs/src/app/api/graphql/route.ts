import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { db } from '@/lib/db';

const typeDefs = `#graphql
  enum TaskStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  enum TaskPriority {
    LOW
    MEDIUM
    HIGH
  }

  enum TaskCategory {
    WORK
    PERSONAL
    EDUCATION
    OTHER
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    status: TaskStatus!
    priority: TaskPriority!
    category: TaskCategory!
    createdAt: String!
  }

  type TaskStats {
    total: Int!
    todo: Int!
    inProgress: Int!
    done: Int!
    highPriority: Int!
  }

  type Query {
    getTasks(status: TaskStatus): [Task!]!
    getStats: TaskStats!
  }

  type Mutation {
    addTask(title: String!, description: String!, priority: TaskPriority!, category: TaskCategory!): Task!
    updateTaskStatus(id: ID!, status: TaskStatus!): Task
    deleteTask(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    getTasks: (_: any, { status }: { status?: 'TODO' | 'IN_PROGRESS' | 'DONE' }) => {
      const allTasks = db.getTasks();
      if (status) {
        return allTasks.filter(t => t.status === status);
      }
      return allTasks;
    },
    getStats: () => {
      return db.getStats();
    }
  },
  Mutation: {
    addTask: (_: any, args: { title: string; description: string; priority: string; category: string }) => {
      return db.addTask(args);
    },
    updateTaskStatus: (_: any, { id, status }: { id: string; status: 'TODO' | 'IN_PROGRESS' | 'DONE' }) => {
      return db.updateTaskStatus(id, status);
    },
    deleteTask: (_: any, { id }: { id: string }) => {
      return db.deleteTask(id);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}

