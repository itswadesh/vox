<script>
	import Layer from './Layer.svelte';
</script>

<div
	style="
  display:block; position:relative;
  width:400px; height:400px;
  margin:60px;
  border:solid 1px black
"
>
	<Layer width={100} height={100} style="top:20px; left:50px;">Welcome</Layer>
	<Layer width={100} height={100} style="top:20px; left:200px;">Web 3.0</Layer>
	<Layer width={100} height={100} style="top:200px; left:50px;">
		<img
			src="/img/pexels-photo-12663061.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
			alt=""
			style="width:100%; height:100%;"
		/>
	</Layer>
	<Layer width={100} height={100} style="top:200px; left:200px;">
		<img
			src="/img/pexels-photo-12785681.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
			alt=""
			style="width:100%; height:100%;"
		/>
	</Layer>
</div>
