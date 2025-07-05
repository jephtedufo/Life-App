import { prisma } from './prisma';

export interface PointsBalance {
  totalEarned: number;
  totalSpent: number;
  currentBalance: number;
}

export interface CategoryStats {
  totalPoints: number;
  totalTasks: number;
}

export async function getPointsBalance(userId: string): Promise<PointsBalance> {
  const [pointLogs, redemptions] = await Promise.all([
    prisma.pointLog.findMany({
      where: { userId },
      select: { totalPoints: true },
    }),
    prisma.redemptionLog.findMany({
      where: { userId },
      select: { pointsSpent: true },
    }),
  ]);

  const totalEarned = pointLogs.reduce((sum, log) => sum + log.totalPoints, 0);
  const totalSpent = redemptions.reduce((sum, redemption) => sum + redemption.pointsSpent, 0);
  const currentBalance = totalEarned - totalSpent;

  return {
    totalEarned,
    totalSpent,
    currentBalance,
  };
}

export async function getCategoryStats(userId: string, categoryId: string): Promise<CategoryStats> {
  const pointLogs = await prisma.pointLog.findMany({
    where: { userId, categoryId },
    select: { totalPoints: true, tasksCompleted: true },
  });

  const totalPoints = pointLogs.reduce((sum, log) => sum + log.totalPoints, 0);
  const totalTasks = pointLogs.reduce((sum, log) => sum + log.tasksCompleted, 0);

  return {
    totalPoints,
    totalTasks,
  };
}

export async function canAffordReward(userId: string, rewardCost: number): Promise<boolean> {
  const balance = await getPointsBalance(userId);
  return balance.currentBalance >= rewardCost;
}

export async function redeemReward(userId: string, rewardId: string): Promise<boolean> {
  const reward = await prisma.reward.findFirst({
    where: { id: rewardId, userId },
  });

  if (!reward) {
    return false;
  }

  const canAfford = await canAffordReward(userId, reward.cost);
  if (!canAfford) {
    return false;
  }

  const redemption = await prisma.redemptionLog.create({
    data: {
      rewardId: reward.id,
      rewardTitle: reward.title,
      pointsSpent: reward.cost,
      date: new Date().toISOString().split('T')[0],
      userId,
    },
  });

  return !!redemption;
} 