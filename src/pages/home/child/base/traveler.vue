<template>
	<div class="traveller-wrap flex content-center align-items-center">
		<div class="traveller">
			<h2>Travellers</h2>
			<ul>
				<li class="flex space-between align-items-center" v-for="(item,index) in person" :key="item.id">
					<span class="parson">{{item.name}}</span>
					<div class="trave-con">
						<span class="minus" @click="minus(index)">-</span>
						<span class="count">{{item.count}}</span>
						<span class="add" @click="add(index)">+</span>
					</div>
				</li>
				<li class="close-class" @click="close">
					<a href="javascript:">Done</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { Passenger, Adult, Child, Infant, PassengerManager, ContactInfo } from '../../../../models/passenger'
export default {
	data() {
		return {
			count: 0,
			person: [
				{
					name: 'Adults',
					count: 1
				},
				{
					name: 'Children',
					count: 0
				},
				{
					name: 'Infants',
					count: 0
				}
			],
			perssenger: {
				adults: [],
				children: [],
				infants: []
			}
		}
	},
	methods: {
		close() {
			this.perssenger.adults = [];
			this.perssenger.children = [];
			this.perssenger.infants = [];
			for (let i = 0; i < this.person[0].count; i++) {
				this.perssenger.adults.push(new Adult());
			}
			for (let i = 0; i < this.person[1].count; i++) {
				this.perssenger.children.push(new Child());
			}
			for (let i = 0; i < this.person[2].count; i++) {
				this.perssenger.infants.push(new Infant());
			}
			console.log(this.perssenger)
			this.$emit("closeTraveller", this.perssenger)
		},
		case(index) {
			switch (index) {
				case 0:
					let acount = 9 - this.person[1].count;
					if (this.person[0].count >= 9) {
						this.person[0].count = 9;
					} else if (this.person[0].count >= acount) {
						this.person[0].count = acount;
					} else if (this.person[0].count < this.person[2].count) {
						this.person[2].count = this.person[0].count;
					}
					break;
				case 1:
					let dcount = 9 - this.person[0].count;
					let hcount = 9 - this.person[0].count;
					if (this.person[1].count >= dcount) {
						this.person[1].count = dcount;
					} else if (this.person[1].count >= hcount) {
						this.person[1].count = hcount;
					}
					break;
				case 2:
					let fcount = this.person[0].count;
					if (this.person[2].count >= fcount) {
						this.person[2].count = fcount;
					}
					break;
			}
		},
		add(index) {
			this.person[index].count++;
			this.case(index);
		},
		minus(index) {
			this.person[index].count--;
			if (this.person[index].name.toString() === 'Adults' && this.person[index].count <= 1) {
				this.person[index].count = 1;
			} else if (this.person[index].count < 0) {
				this.person[index].count = 0;
			}
			this.case(index);
		}
	}
}
</script>
<style lang="less" scoped>
.traveller-wrap {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 20;
	box-sizing: border-box;
	padding: 0 0.64rem;
}

.traveller {
	width: 100%;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 0.4rem;
	padding: 0.68rem;
	h2 {
		font-size: 0.68rem;
		color: #000;
		padding: 0.5rem;
		border-bottom: 1px solid #ccc;
	}
	ul {
		li {
			font-size: 0.68rem;
			padding: 0.68rem 1rem;
			border-bottom: 1px solid #ccc;
			.count {
				padding: 0 0.6rem;
			}
			.add,
			.minus {
				width: 1rem;
				height: 1rem;
				line-height: 1rem;
				font-weight: bold;
				color: #ffad3d;
				border: 1px solid #ffad3d;
				border-radius: 4px;
			}
		}
		.close-class,
		a {
			color: #ffad3d;
			font-size: 0.68rem;
			text-align: right;
		}
	}
}
</style>