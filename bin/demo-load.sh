for i in `seq 1 50`;
        do
                nohup bin/demo.sh $i &
		echo $i
        done    
