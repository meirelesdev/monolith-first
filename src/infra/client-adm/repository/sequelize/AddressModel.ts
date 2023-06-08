import { Column, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "addresses",
  timestamps: false,
})
export default class AddressModel extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column({ allowNull: false })
  client_id: string;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  number: string;

  @Column({ allowNull: true })
  complement: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  state: string;

  @Column({ allowNull: false })
  zipcode: string;
}
