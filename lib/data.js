import { pool } from "@/lib/db";

const defaultFamilyId = Number(process.env.DEFAULT_FAMILY_ID || 1);
const defaultMaxStock = Number(process.env.INVENTORY_MAX_STOCK || 30);

function dayOfWeekToken(date = new Date()) {
  const day = date.getDay();
  const map = [7, 1, 2, 3, 4, 5, 6];
  return String(map[day]);
}

function formatTime(value) {
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 5);
  return value.toString().slice(0, 5);
}

export async function getDashboardTasks(familyId = defaultFamilyId) {
  try {
    const dayToken = dayOfWeekToken();
    const result = await pool.query(
      `
      SELECT
        ds.id,
        ds.time_of_day,
        ds.notes,
        u.name AS member_name,
        m.name AS medicine_name
      FROM dose_schedules ds
      JOIN family_members fm ON fm.id = ds.family_member_id
      JOIN users u ON u.id = fm.user_id
      JOIN medicines m ON m.id = ds.medicine_id
      WHERE ds.family_id = $1
        AND ds.active = true
        AND POSITION($2 IN ds.days_of_week) > 0
      ORDER BY ds.time_of_day ASC
      `,
      [familyId, dayToken]
    );

    if (result.rows.length === 0) {
      return [];
    }

    return result.rows.map((row) => ({
      id: row.id,
      time: formatTime(row.time_of_day),
      member: row.member_name || "Sin nombre",
      medicine: row.medicine_name || "Medicamento",
      dose: row.notes || "1 unidad",
    }));
  } catch (error) {
    return [
      {
        id: "mock-1",
        time: "08:00",
        member: "Mamá",
        medicine: "Vitaminas",
        dose: "1 cápsula",
      },
      {
        id: "mock-2",
        time: "12:30",
        member: "Papá",
        medicine: "Presión arterial",
        dose: "1 tableta",
      },
    ];
  }
}

export async function getFamilyStatus(familyId = defaultFamilyId) {
  try {
    const dayToken = dayOfWeekToken();
    const result = await pool.query(
      `
      SELECT
        fm.id AS family_member_id,
        u.name AS member_name,
        MIN(ds.time_of_day) AS next_time
      FROM family_members fm
      JOIN users u ON u.id = fm.user_id
      LEFT JOIN dose_schedules ds
        ON ds.family_member_id = fm.id
        AND ds.active = true
        AND POSITION($2 IN ds.days_of_week) > 0
      WHERE fm.family_id = $1
      GROUP BY fm.id, u.name
      ORDER BY u.name ASC
      `,
      [familyId, dayToken]
    );

    if (result.rows.length === 0) {
      return [];
    }

    return result.rows.map((row) => {
      const time = formatTime(row.next_time);
      const ok = !time;
      return {
        id: row.family_member_id,
        name: row.member_name || "Miembro",
        status: ok ? "Todo al día" : `Pendiente la dosis de las ${time}`,
        ok,
      };
    });
  } catch (error) {
    return [
      { id: "mock-1", name: "Mamá", status: "Todo al día", ok: true },
      {
        id: "mock-2",
        name: "Papá",
        status: "Pendiente la dosis de las 08:00",
        ok: false,
      },
    ];
  }
}

export async function getInventory(familyId = defaultFamilyId) {
  try {
    const result = await pool.query(
      `
      SELECT id, name, stock, unit, expiry_date
      FROM medicines
      WHERE family_id = $1
      ORDER BY name ASC
      `,
      [familyId]
    );

    if (result.rows.length === 0) {
      return [];
    }

    return result.rows.map((row) => {
      const stock = Number(row.stock || 0);
      const percent = Math.min(
        100,
        Math.round((stock / defaultMaxStock) * 100)
      );
      return {
        id: row.id,
        name: row.name || "Medicamento",
        stock,
        unit: row.unit || "unidades",
        percent,
        expiryDate: row.expiry_date,
      };
    });
  } catch (error) {
    return [
      {
        id: "mock-1",
        name: "Paracetamol",
        stock: 18,
        unit: "tabletas",
        percent: 60,
        expiryDate: null,
      },
      {
        id: "mock-2",
        name: "Jarabe infantil",
        stock: 8,
        unit: "ml",
        percent: 30,
        expiryDate: null,
      },
    ];
  }
}
