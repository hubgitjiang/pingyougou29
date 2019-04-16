<template>
    <div class="search">
        <div class="serach_input">
            <input type="text">
            <div class="word">
                <icon type="search" size="20"></icon>
                <span>搜索</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.search {
    padding: 20rpx 16rpx;
    background-color: #eb4450;
    .serach_input {
        width: 100%;
        height: 60rpx;
        background-color: #fff;
        position: relative;
        .text {}
        .word {
            position: absolute;
            display: flex;
            align-items: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            icon {
                margin-right: 10rpx;
            }
            span {
                color: #bbb;
                font-size: 20px;
            }
        }
    }
}
</style>
